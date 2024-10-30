# Setup Label Studio in local and Get started for annotations

> Before you get started: Understand why we are using Label Studio.[here]()

> For setting up label studio, refer [Label studio local setup guide ](https://labelstud.io/guide/install) to get a good overview on installation as there are many ways.

> On successful setting up of label studio, follow below given steps to automatically import the images.

In order to import the images, there are many ways to [Sync data from external storage](https://labelstud.io/guide/storage). i.e; from the Amazon S3, Google Cloud Storage, Microsoft Azure Blob storage, Redis database, Local storage.

If the use case is from the [local Storage](https://labelstud.io/guide/storage#Local-storage) then, we can import the images from the local storage in two ways: Cloud storage and json file.

````

Note: You might come across the validation error while importing,

                                               Runtime error

Validation error

[ErrorDetail(string="Serving local files can be dangerous, so it's disabled by default. You can enable it with LOCAL_FILES_SERVING_ENABLED environment variable, please check docs: https://labelstud.io/guide/storage.html#Local-storage", code='invalid')]```

````

In order to avoid this error, make sure you run the following cmd, before starting the label-studio

```bash

export  LOCAL_FILES_SERVING_ENABLED=True

```

## i. Cloud Storage

if you are using the cloud storage to import the images:

- Make sure you have create the project, and fill all the necessary details.

- Click on the `settings` button on the top right corner.

- Choose `cloud storage` option in the sidebar.

- Click on the `Add storage` button.

- In the storage type, select `local files`.

- Add `storage title`(optional) and `Absolute local path`(Path the images).

- Add `filter regex`(Optional), if you want sort out on some criteria(jpg, png, etc;)

- Click on `add storage`.

- Repeat these steps for Add `Target Storage` to use a local file directory for exporting.

> Note: Click Add Storage, but not use synchronization (don’t touch button Sync Storage) after the storage creation, to avoid automatic task creation from storage files.

In order access the images, All file paths must begin with `/data/local-files/?d=`

Open a new tab, and search for the image in browser using following. make sure you change `path/to/image`.

for example: `localhost:port/data/local-files/?d=path/to/image`

> Note: path/to/image has to be complete path.

Then you might get the image you've searched. If you don't get the images, check for the potential issue/error.

This is how use can import and access the images using cloud storage with the storage type - local files.

## ii. JSON file

In case if we are trying to import the images using JSON file, Follow following steps.

- As soon, we create a new project. Click on the `Go to import` button.

- Add the Dataset URL/ Upload a file(JSON file).

- Then, click on the import button to add image.

Before which make sure you've created the JSON file in appropriate manner. for example:

```
[{
 "id": 1,
 "data": {
    "audio": "/data/local-files/?d=dataset1/audio/1.wav",
    "image": "/data/local-files/?d=dataset1/images/1.jpg"
  }
},
{
 "id": 2,
 "data": {
    "audio": "/data/local-files/?d=dataset1/audio/2.wav",
    "image": "/data/local-files/?d=dataset1/images/2.jpg"
  }
}]
```

Another simple example, if we've images only. then it would look like:

```

{
	"image" : "/data/local-files/?d=path/to/image"
}

```

> Note: path/to/image has to be complete path.

> Note: If we've more than one image, then use array of objects.

Then In the main page, you might see the image. Click on the image to view.

If it is not image is not shown or only string is shown then select the dropdown beside `Annotated by` to select `image` option. Then you can view the image.

This is how use can import and access the images using JSON file.

> Note: Syncing has to be done manually, since there is no automation available.
