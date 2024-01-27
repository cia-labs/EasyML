import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';

interface ImageData {
  id: number;
  url: string;
}

const RetrieveImageScreen: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const category: { key: string; label: string }[] = [
    { key: 'cat1', label: 'check1' },
    { key: 'cat2', label: 'check2' },
    { key: 'cat3', label: 'check3' },
  ];

  const selectCategory = async () => {(option: { key: string; label: string }) => { 
    setSelectedCategory(option.label)}};

  useEffect(() => {
    // Fetch image data from the Backend API with category
    const fetchImages = async () => {
      try {
        const response = await axios.get('/get_images/{category}', {
          params: {
            category: selectCategory, // Replace with the actual category
          },
        });

        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []); // Run only on mount

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 32, color: 'black', textAlign: 'center', marginBottom: 50 }}>Retrieve Image</Text>

      <ModalSelector
        data={category}
        initValueTextStyle={ { fontWeight: 'bold', color: 'black'}}
        initValue="Select Category"
        accessible={true}
        onChange={selectCategory}
        selectStyle={{ borderWidth: 10 }}
        cancelStyle={{ borderWidth: 10 }}
      />
    
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
          </View>
        )}
      />
    </View>
  );
};

export default RetrieveImageScreen;
