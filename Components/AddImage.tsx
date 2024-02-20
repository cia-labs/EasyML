
import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, Platform, Alert, PermissionsAndroid, ScrollView } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import * as RNFS from 'react-native-fs';

const AddImage: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<ImageOrVideo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [base64images, setBase64Images] = useState<string[]>([]);

  const category: { key: string; label: string }[] = [
    { key: 'cat1', label: 'cat1' },
    { key: 'cat2', label: 'cat2' },
    { key: 'cat3', label: 'cat3' },
  ];

  useEffect(() => {
    // Request camera and storage permissions when the component mounts
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grantedCamera = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera permission to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permissions granted');
        } else {
          console.log('Camera permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const selectImages = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        cropping: true,
      });
      setSelectedImages(images);

      const base64ImagesArray = await Promise.all(
        images.map(async (image) => {
          const filePath = Platform.OS === 'android' ? image.path.replace('file://', '') : image.path;
          return await RNFS.readFile(filePath, 'base64');
        })
      );
      setBase64Images(base64ImagesArray);
    } catch (error) {
      console.log('Image selection cancelled or failed.', error);
    }
  };

  const selectCategory = (option: { key: string; label: string }) => {
    setSelectedCategory(option.key);
  };

  const uploadImages = async () => {
    if (!selectedImages.length || !selectedCategory) {
      Alert.alert('Error', 'Please select at least one image and a category.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('category', selectedCategory);
      
      // Append each base64 image to FormData
      base64images.forEach((base64Image, index) => {
        formData.append('image', base64Image);
      });

      try {
        const response = await axios.post('http://192.168.1.3:8000/uploadfiles/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            
          },
        });

      console.log('Images uploaded', response);
      Alert.alert('Success', 'Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      Alert.alert('Error', 'Failed to upload images. Please try again.');
    }
  };

  return (
      <ScrollView> 
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 32, color: 'black', textAlign: 'center', marginBottom: 50 }}>
            Add Images
          </Text>
          <Button onPress={selectImages} title="Select Images" color="black" />
  
          {selectedImages.map((image, index) => (
            <Image key={index} source={{ uri: image.path }} style={{ width: 200, height: 200, marginVertical: 10 }} />
          ))}
  
          <ModalSelector
            data={category}
            initValueTextStyle={{ fontWeight: 'bold', color: 'black' }}
            initValue="Select Category"
            accessible={true}
            onChange={selectCategory}
            selectStyle={{ borderWidth: 10 }}
            cancelStyle={{ borderWidth: 10 }}
          />
  
          <Button onPress={uploadImages} title="Upload Images" color="blue" />
        </View>
      </ScrollView>
    );
  };

export default AddImage;

