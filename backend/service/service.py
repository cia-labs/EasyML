from fastapi import HTTPException, UploadFile,Form
from config import AppConfig
import base64
import json
import binascii
import requests
from pydantic import BaseModel
from typing import List 
from database.database import collectionMeta,collectionResult
from ciaos import save
from typing import List 
from models.model import Feedback,Metadata




def test_model_v1(base64_str: str, model_name: str):
    if not all([base64_str, model_name]):
        raise HTTPException(status_code=400, detail="Missing required parameters: base64 and model_name")

    try:
        image_data = base64.b64decode(base64_str)
        data = {"image": ("image", image_data), "model_name": model_name}
        response = requests.post(f"{AppConfig.MAS_SERVICE_URL}{AppConfig.MAS_SERVICE_ENDPOINT}", data=data) 
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except (ValueError, requests.exceptions.RequestException) as e:
        raise HTTPException(status_code=500, detail=f"Error sending request to MAS service: {str(e)}")

def test_model_v2(file: UploadFile):
    try:
        files = {'file': (file.filename, file.file.read(), file.content_type)}
        masResponse = requests.post(f"{AppConfig.MAS_SERVICE_URL}{AppConfig.MAS_SERVICE_ENDPOINT}", files=files)
        
        binary_data =file.file.read()
        encoded = binascii.b2a_base64(binary_data, newline=False)
        base64_string=encoded.decode('utf-8')
       
        response = save(AppConfig.STORAGE_BASE_URL, "", base64_string)
        json_response = response.json()
        key = json_response.get('key') 
        print(key)

        if masResponse.status_code == 200:
            try:
                result = masResponse.json()
                return {"apiResult": "No" if result == 0 else "Yes", "imageKey": key}
            except ValueError:
                return {"error": "Failed to parse JSON response"}
        else:
            return {"error": "Failed to get response from API"}
        
    except Exception as e:
        return {"error": f"Failed to complete the request: {str(e)}"}

def createFeedback(feedback: Feedback):
    try:
        feedback_id = collectionResult.insert_one(feedback.dict()).inserted_id
        return {"message": "Feedback submitted successfully", "feedback_id": str(feedback_id)}

    except Exception as e:
        return {"error": f"Failed to send feedback the request: {str(e)}"}

def fetch_metadata(query):
    try:
        data = []
        for document in (collectionMeta.find({"type":query})):
            data.append(document["value"])
        return data
    except Exception as e:
         return {"error": f"Failed to fetch metadata: {str(e)}"}


