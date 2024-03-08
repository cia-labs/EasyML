from fastapi import HTTPException, UploadFile
from config import AppConfig
import base64
import requests

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
        response = requests.post(f"{AppConfig.MAS_SERVICE_URL}{AppConfig.MAS_SERVICE_ENDPOINT}", files=files)
        
        if response.status_code == 200:
            try:
                result = response.json()
                return "No" if result == 0 else "Yes"
            except ValueError:
                return {"error": "Failed to parse JSON response"}
        else:
            return {"error": "Failed to get response from API"}
        
    except Exception as e:
        return {"error": f"Failed to complete the request: {str(e)}"}