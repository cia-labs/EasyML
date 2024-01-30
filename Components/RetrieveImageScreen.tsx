
import React, { useState, useCallback } from 'react';
import { Button, View, Text, Image, Platform, Alert, Linking } from 'react-native';
import ImagePicker, { ImageCropPicker, ImageOrVideo } from 'react-native-image-crop-picker';
import axios, { AxiosResponse } from 'axios';
import ModalSelector from 'react-native-modal-selector';
import * as RNFS from 'react-native-fs'; // Replace with React Native FS

interface ImageData {
  name: string;
  data: string;
}

const RetrieveImageScreen: React.FC = () => {
  
  const [category, setSelectedCategory] = useState<string | null>(null);
  const categories: { key: string; label: string }[] = [
    { key: 'cat1', label: 'cat1' },
    { key: 'cat2', label: 'cat2' },
    { key: 'cat3', label: 'cat3' },
  ];
  const [images, setImages] = useState<ImageData[]>([]);



  const selectCategory = async () => {(option: { key: string; label: string }) => { 
    setSelectedCategory(option.key)}};
  

  
  
  const fetchImages = async () => {

 
   
      try {
        const response = await axios.get(`http://192.168.1.3:8000/get_images/${category}`);
        
        //console.log('Image retrieved', response);
        setImages(response.data.images);
        console.log(images)
      } catch (error) {
        console.error('Error retrieving image:', error);
        Alert.alert('Error', 'Failed to retrieve image. Please try again.');
      }
    };
  


return (
  <View>

<Text style={{ fontWeight: 'bold', fontSize: 32, color: 'black', textAlign: 'center', marginBottom: 20 }}>
        Retrieve Image
      </Text>


    <ModalSelector
      data={categories}
      initValueTextStyle={ { fontWeight: 'bold', color: 'black'}}
      initValue="Select Category"
      accessible={true}
      onChange={(option: { key: string; label: string }) => { setSelectedCategory(option.key)}}
      selectStyle={{ borderWidth: 10 }}
      cancelStyle={{ borderWidth: 10 }}
    />


  <Button
      onPress={fetchImages} 
      title="Retrieve Image"
      color="blue"     
    />

<View>
<Text style={{ fontWeight: 'bold', fontSize: 24, color: 'black', textAlign: 'center', marginBottom: 20 }}>
        {category}
      </Text>
        {images && images.length > 0 && ( // Ensure images array has data
          <Image
            source={{ uri: `data:image/jpg;base64,${images[0].data}` }} // Access the first image's data
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
  
 </View> 
  
);
    };
export default RetrieveImageScreen;

