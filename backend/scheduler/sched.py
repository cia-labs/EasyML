import datetime as dt
import os
import base64
import httpx
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI
from pymongo import MongoClient

load_dotenv()

app = FastAPI()
scheduler = AsyncIOScheduler()

DB_URI = os.getenv("DB_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(DB_URI)
db = client[DB_NAME]
collection = db['feedback']

"""
This is used while testing
Fetches the all the images...
"""
# async def fetch_image_keys():
#     return list(collection.find({"qa.0.answer": "No"}, {"imageKey": 1}))


"""
Fetches the image key of that day
"""
async def fetch_image_keys():
    today = dt.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    tomorrow = today + dt.timedelta(days=1)
    return list(collection.find({
        "qa.0.answer": "No",
        "createdAt": {"$gte": today, "$lt": tomorrow}
    }, {"imageKey": 1}))

async def fetch_images():
    image_keys = await fetch_image_keys()
    saved_images = []
    image_directory = "/opt/label-studio-data"
    os.makedirs(image_directory, exist_ok=True)

    async with httpx.AsyncClient() as client:
        for item in image_keys:
            image_key = item.get("imageKey")
            if image_key:
                try:
                    url = f"https://storage.cialabs.org/get/{image_key}"
                    response = await client.get(url)
                    
                    if response.status_code == 200:
                        image_data = base64.b64decode(response.text)
                        filename = f"{image_key}.jpg"
                        image_path = os.path.join(image_directory, filename)
                        
                        with open(image_path, "wb") as image_file:
                            image_file.write(image_data)
                            saved_images.append(image_path)
                except Exception as e:
                    print(f"Error processing image for key {image_key}: {e}")

    return saved_images

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    yield
    scheduler.shutdown()


# scheduler.add_job(fetch_images, 'interval', seconds=10)
scheduler.add_job(fetch_images, CronTrigger(hour=0, minute=0))

app = FastAPI(lifespan=lifespan)

@app.get("/fetch-images")
async def fetch_images_endpoint():
    return await fetch_images()
