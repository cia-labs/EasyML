# Why scheduler?

Scheduler is being used to fetch all the images for which the model has not properly identified. Here it bascially gets all the image-key from the MongoDB of that day where the model has the not properly identified the images. Based on the key fetched it gets the images from the storage-service and places in the target image directory. i.e `/opt/label-studio-data`.

## Understand how scheduler is running

- In order to understand how the scheduler works under the hood. Get the credentials for portainer from ` Mr Surya`.
- Checkout the `label-stud` container.
- In that look for port mapping.
- Once you have clear picture. Now you can start the scheduler, By navigating in to the scheduler directory.

```bash
# Naviagte to scheduler
cd backend/scheduler

# start the server
uvicorn sched:app --host 0.0.0.0 --port 5000 --reload
```

### Test the endpoints

```bash
testmas.cialabs.org/docs
```
