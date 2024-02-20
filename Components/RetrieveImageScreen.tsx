
import React, { useState } from 'react';
import { Button, View, Text, Image, Alert } from 'react-native';
import axios from 'axios';
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
    try {
      const response = await axios.get(`https://which-api.cialabs.tech/get_images/${category}`);

      if (!Array.isArray(response.data)) {
        Alert.alert('Error', 'Invalid image data received from the server.');
        return;
      }

      const base64Images: string[] = response.data;

      const imageDataList: ImageData[] = base64Images.map((imageString: string, index: number) => ({
        name: `Image ${index + 1}`,
        data: imageString,
      }));

      setImages(imageDataList);
    } catch (error) {
      console.error('Error retrieving images:', error);
      Alert.alert('Error', 'Failed to retrieve images. Please try again.');
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