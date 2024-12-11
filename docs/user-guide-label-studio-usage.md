# Current Efforts on Annotation

> Understand how to import the images in the [label studio]() or manually import by clicking the import button.

> <img src="https://s3-public.cialabs.org/easy-ml/docs/import-images.png" alt="import image">

<br/>
Once you successfully imported the images. you will see something like this.

<img src="https://s3-public.cialabs.org/easy-ml/docs/after-importing.png" alt="successfully importing image">

<br>

- Once you've the images, start annotation by moving in to the project and once you are on your on-boarding page.

- click on the images and you will be the dialogue given in the below image

<img src="https://s3-public.cialabs.org/easy-ml/docs/start-annotation.png" alt="start annotation">

- select any one the field that you want to categorize.

- Once you are done with the categorizing, submit the response

- You can verify that wheather you've successfully annotated the images or not by hovering over the the annotated by and the total annotation will be increased by 1.

<img src="https://s3-public.cialabs.org/easy-ml/docs/view-anno-details.png" alt="view anno details">

- since, you've completed the annotation. [optioal] move the images to the target location by moving in to breadcrumb location and click on the sync storage in the target cloud storage.

<img src="https://s3-public.cialabs.org/easy-ml/docs/sync-target.png" alt="sync target location">

- Wait for a while and once the syncing gets competed verify by checking in the target location [ In the portainer i.e labe-stud container].

- Run the below cmd to verify by the logging the metadata about the annotated images and since these data are been stored in the storage service, all these files are named in the numbers i.e 1, 2 ...

```
# move to the output dir and view

cd opt/output
vi example

```

<img src="https://s3-public.cialabs.org/easy-ml/docs/verify-anno-1.png" alt="verify anno">

<br>

<img src="https://s3-public.cialabs.org/easy-ml/docs/view-meta-data.png" alt="verify anno metadata">

- Now you have successfully annotated the image.
