from fastapi import FastAPI, UploadFile
import cv2
import numpy as np
from ultralytics import YOLO


app = FastAPI()

model = YOLO("yolo26n.pt")

@app.post("/upload/")
async def create_item(file: UploadFile):
    file_contents = await file.read()
    await file.close()

    file_array = np.frombuffer(file_contents, dtype=np.int8)

    image = cv2.imdecode(file_array, cv2.IMREAD_COLOR)

    predictions = model.predict(image)

    predictions_json = predictions[0].to_json()
    return predictions_json