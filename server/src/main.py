from fastapi import FastAPI, UploadFile, HTTPException, status
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from ultralytics import YOLO
import logging
import os
from dotenv import load_dotenv

CLASS_FILTER = [56, 57, 58, 59, 60, 61, 62, 68, 69, 70, 71, 72]

ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"]
MAX_FILE_SIZE = 10485760

app = FastAPI(title="Home Analyzer", 
              description="Backend of Home Analyzer which locates and identifies furniture in an image.", 
              contact={"name": "Robert Wang", "url": "https://dustymcheese.github.io/personal-website/"}, 
              license_info={"name": "GNU Affero General Public License", "url": "https://www.gnu.org/licenses/agpl-3.0.en.html"})

# Allowing the frontend URL stored in .env to access this backend
load_dotenv()
frontend_url = os.getenv("FRONTEND_URL")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolo26n.pt")

logger = logging.getLogger(__name__)

class Box(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float

class Analysis(BaseModel):
    name: str
    # Naming class as attribute furnitureClass with the alias class because class is a reserved keyword in Python
    furnitureClass: int = Field(alias="class")
    confidence: float
    box: Box

class Error(BaseModel):
    detail: str

# A class inheriting from HTTPException that represents an Exception that arises after 
# the program detects that the content provided is unprocessable
class UnprocessableContentException(HTTPException):
    def __init__(self, detail=None, headers=None):
        super().__init__(status.HTTP_422_UNPROCESSABLE_CONTENT, detail, headers)


@app.post("/upload/", response_model=list[Analysis], responses={415: {"model": Error}, 413: {"model": Error}, 422: {"model": Error}, 500: {"model": Error}})
async def analyze_item(file: UploadFile):
    """Locate and identify furniture in an uploaded image.
    """
    # Checking to make sure only supported file types of png and jpeg are accepted
    if file.content_type not in ACCEPTED_IMAGE_TYPES:
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

    # Ensuring that the file size does not exceed 10MB to prevent large files from being processed
    content_section = await file.read(1048576)
    file_contents = bytes()
    while (len(content_section) > 0):
        file_contents += content_section 
        if len(file_contents) > MAX_FILE_SIZE:      
            await file.close()
            raise HTTPException(status_code=status.HTTP_413_CONTENT_TOO_LARGE, detail="File size exceeds 10MB.")
        content_section = await file.read(1048576)
    await file.close()

    try:
        file_array = np.frombuffer(file_contents, dtype=np.int8)
    
        image = cv2.imdecode(file_array, cv2.IMREAD_COLOR)
        # Making sure that OpenCV is successful to prevent invalid images from being used for predictions
        if image is None:
            raise UnprocessableContentException()

        predictions = model.predict(image, classes=CLASS_FILTER) 
        # Converting the predictions to a dictionary to allow FastAPI to convert to JSON
        predictions_json = predictions[0].summary()
        return predictions_json        
    except UnprocessableContentException:
        logger.exception("Invalid Image")
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail=f"Corrupted or unsupported image")
    except Exception:
        logger.exception("Server Failure")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Server Failure")
