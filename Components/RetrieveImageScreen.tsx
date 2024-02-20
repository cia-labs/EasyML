
import React, { useState, useCallback } from 'react';
import { Button, View, Text, Image, Platform, Alert, Linking } from 'react-native';
import ImagePicker, { ImageCropPicker, ImageOrVideo } from 'react-native-image-crop-picker';
import axios, { AxiosResponse } from 'axios';
import ModalSelector from 'react-native-modal-selector';
import { ScrollView } from 'react-native-gesture-handler';

interface ImageData {
  name: string;
  data: string;
}

const RetrieveImageScreen: React.FC = () => {
  const [category, setSelectedCategory] = useState<string | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const categories: { key: string; label: string }[] = [
    { key: 'cat1', label: 'cat1' },
    { key: 'cat2', label: 'cat2' },
    { key: 'cat3', label: 'cat3' },
  ];

  const selectCategory = (option: { key: string; label: string }) => {
    setSelectedCategory(option.key);
  };

  const fetchImages = async () => {

  // const formData=new FormData();
   //formData.append('category', selectedCategory);
   
      try {
<<<<<<< HEAD
        const response = await axios.get(`http://192.168.1.3:8000/get_images/${category}`);
=======
        const response = await axios.get(`http://192.168.57.43:8000/get_images/${category}`);
>>>>>>> 182109af2a805e84ea32791a0120b708c21e13ef
        
        //console.log('Image retrieved', response);
        setImages(response.data.images);
        console.log(images)
      } catch (error) {
        console.error('Error retrieving image:', error);
        Alert.alert('Error', 'Failed to retrieve image. Please try again.');
      }
    };
  


  return (

    <ScrollView>
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 32, color: 'black', textAlign: 'center', marginBottom: 20 }}>
        Retrieve Image
      </Text>

      <ModalSelector
        data={categories}
        initValueTextStyle={{ fontWeight: 'bold', color: 'black' }}
        initValue="Select Category"
        accessible={true}
        onChange={selectCategory}
        selectStyle={{ borderWidth: 10 }}
        cancelStyle={{ borderWidth: 10 }}
      />

      <Button onPress={fetchImages} title="Retrieve Image" color="blue" />

      <View>
        {images.length === 0 ? (
          <Text>No images available</Text>
        ) : (
          images.map((item: ImageData, index: number) => (
            <View key={index}>
              <Text>{item.name}</Text>
              <Image source={{ uri: `data:image/jpeg;base64,${item.data}` }} style={{ width: 200, height: 200, margin: 10 }} />
            </View>
          ))
        )}
      </View>
    </View>
    </ScrollView>
  );
};

export default RetrieveImageScreen;

