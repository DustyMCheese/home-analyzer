from fastapi import FastAPI, UploadFile, HTTPException, status
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

app = FastAPI()
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

@app.post("/upload/")
async def create_item(file: UploadFile):
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
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Corrupted or unsupported Image")

        predictions = model.predict(image, classes=CLASS_FILTER) 
        predictions_json = predictions[0].to_json()
        return predictions_json
    except ValueError:
        logger.exception("Invalid Image")
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail=f"Invalid Image")
    except Exception:
        logger.exception("Server Failure")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Server Failure")
