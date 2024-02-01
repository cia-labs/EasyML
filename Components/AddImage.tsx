/* import React, { useState, useCallback } from 'react';
import { Button, View, Text, Image, Platform, Alert, Linking } from 'react-native';
import ImagePicker, { Image as ImagePickerImage } from 'react-native-image-crop-picker';
import axios, { AxiosResponse } from 'axios';
import ModalSelector from 'react-native-modal-selector';
import mime from "mime";


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


const uploadImage = async () => {
  if (!selectedImage) {
    Alert.alert('Error', 'Please select an image first.');
    return;
  }

  const formData = new FormData();
  formData.append('category', selectedCategory);
  formData.append('files', {
    ufilenameri: selectedImage.path.split('/').pop(),
    type: mime.getType(selectedImage.path), // Adjust based on image type
   // Adjust filename if needed
  });



  

   try {
    const response = await axios.post('http://192.168.1.3:8000/uploadfiles/', formData, {
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

export default AddImage; */



import React, { useState, useCallback } from 'react';
import { Button, View, Text, Image, Platform, Alert, Linking } from 'react-native';
import ImagePicker, { ImageCropPicker, ImageOrVideo } from 'react-native-image-crop-picker';
import axios, { AxiosResponse } from 'axios';
import ModalSelector from 'react-native-modal-selector';
import * as RNFS from 'react-native-fs'; // Replace with React Native FS

const AddImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageOrVideo | null>(null);
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
  
  
  

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    // Get base64-encoded image data using RNFS
    const filePath = Platform.OS === 'android' ? selectedImage.path.replace('file://', '') : selectedImage.path;
    try {
      const base64Data = await RNFS.readFile(filePath, 'base64');

      const formData = new FormData();
      formData.append('image', base64Data);
      formData.append('category', selectedCategory);
      formData.append('filename', selectedImage.path.split('/').pop());

       console.log(formData)

      try {
        const response = await axios.post('http://192.168.1.3:8000/uploadfiles/', formData, {
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
    } catch (readFileError) {
      console.error('Error reading image file:', readFileError);
      Alert.alert('Error', 'Failed to read selected image.');
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
