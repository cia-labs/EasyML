from pstats import Stats
import statistics
import requests
from config import AppConfig  
from typing import List, Optional
from fastapi import FastAPI, Query, HTTPException, Form
from fastapi.responses import JSONResponse
from ciaos import save,get
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=AppConfig.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/uploadfiles/")
async def update_file(category: Optional[str] = Form(None), image: List[str] = Form(...)):
    try:
        save(AppConfig.STORAGE_BASE_URL, category, image)
        return JSONResponse(content={"message": f"Image saved locally at: {category}"}, status_code=200)
    except HTTPException as e:
        return JSONResponse(content={"error": str(e.detail)}, status_code=e.status_code)

@app.get("/get_images/{category}")
async def get_images(category: str):
    try:
        images = get(AppConfig.STORAGE_BASE_URL, category)
        return images
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/test_model")
async def test_model(base64: str = Query(..., description="Base64-encoded image data"), model_name: str = Query(..., description="Name of the model to use")):
   
    if not all([base64, model_name]):
        raise HTTPException(status_code=statistics.HTTP_400_BAD_REQUEST, detail="Missing required parameters: base64 and model_name")

    try:
        image_data = base64.b64decode(base64)
        data = {"image": ("image", image_data), "model_name": model_name}
        response = requests.post(f"{AppConfig.MAS_SERVICE_URL}{AppConfig.MAS_SERVICE_ENDPOINT}", data=data)  # Using AppConfig to access attributes
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except (ValueError, requests.exceptions.RequestException) as e:
        raise HTTPException(status_code=Stats.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error sending request to MAS service: {str(e)}")
