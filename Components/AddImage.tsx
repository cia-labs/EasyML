import React, { useState, useCallback } from 'react';
import { Button, View, Text, Image, Platform, Alert, Linking } from 'react-native';
import ImagePicker, { Image as ImagePickerImage } from 'react-native-image-crop-picker';
import axios, { AxiosResponse } from 'axios';
import ModalSelector from 'react-native-modal-selector';
import { Picker } from '@react-native-picker/picker';
// import Crypto from 'react-native-crypto';
//import mime from "mime";

interface Category {
  value: string;
  label: string;
}

interface ItemProps {
  category: string;
  image: File[];
}


const AddImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImagePickerImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const category: { key: string; label: string }[] = [
    { key: 'cat1', label: 'check1' },
    { key: 'cat2', label: 'check2' },
    { key: 'cat3', label: 'check3' },
  ];



  const selectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true,
      });
     setSelectedImage(image);
    
    } catch (error) {
      console.log('Image selection cancelled or failed.', error);
    }
  };

  const selectCategory = async () => {(option: { key: string; label: string }) => { 
    setSelectedCategory(option.key)}};

  const extractFileName = (uri: string) => {
    const pathArray = uri.split('/');
    const fileName = pathArray[pathArray.length - 1];
    return fileName;
  };

/*
const uploadImage = async () => {
  if (!selectedImage || !selectedCategory) {
    return;
  }

  const formData = new FormData();
  formData.append('category', selectedCategory);
  formData.append('images', selectedImage.path)
  
  /* {
    uri: selectedImage,
    type: 'image/jpeg',
    name: 'selectedImage.filename',
  });
*/

/*
  console.log(formData)

  fetch('https://127.0.0.1:8000/uploadfiles/', {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
};
  */

  /* try {
    const response = await axios.post('http://127.0.0.1:8000/uploadfiles/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Image uploaded successfully:', response);
    // Clear selectedImage and display success message
  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle error gracefully, display user-friendly message
  }
}; */


const uploadImage = async () => {
  if (!selectedImage) {
    Alert.alert('Error', 'Please select an image first.');
    return;
  }

  const formData = new FormData();
  //const filename = extractFileName(selectedImage.path);
  formData.append('category', selectedCategory);
  formData.append('files', {
    uri: selectedImage,
    type: 'image/jpeg', // Adjust based on image type
    name: 'image.jpg', // Adjust filename if needed
  });



   // const serverUrl = 'http://10.0.2.2:80081'
   // Linking.openURL(`${serverUrl}/uploadfiles/${formData}`);


   try {
    const response = await axios.post('http://10.0.2.2:8081/uploadfiles/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Image uploaded', response);
    Alert.alert('Success', 'Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error);
    Alert.alert('Error', 'Failed to upload image. Please try again.');
  }
};

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 32, color: 'black', textAlign: 'center', marginBottom: 50 }}>Add Image</Text>
      <Button
      onPress={selectImage}
      title="Select Image"
      color="black"
      />

      {selectedImage && (
        <Image source={{ uri: selectedImage.path }} style={{ width: 200, height: 200 }} />
      )}

      <ModalSelector
        data={category}
        initValueTextStyle={ { fontWeight: 'bold', color: 'black'}}
        initValue="Select Category"
        accessible={true}
        onChange={(option: { key: string; label: string }) => { setSelectedCategory(option.key)}}
        selectStyle={{ borderWidth: 10 }}
        cancelStyle={{ borderWidth: 10 }}
      />


    <Button
        onPress={uploadImage} // Use uploadImage directly without hardcoded values
        title="Upload Image"
        color="blue"
        
      />
    </View>
  );
};

export default AddImage;




