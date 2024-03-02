import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import OpenPhoto from './OpenPhoto';

interface ImageData {
  name: string;
  data: string;
}

const RetrieveImageScreen: React.FC = () => {
  const [category, setSelectedCategory] = useState<string | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const categories: {key: string; label: string}[] = [
    {key: 'cat1', label: 'cat1'},
    {key: 'cat2', label: 'cat2'},
    {key: 'cat3', label: 'cat3'},
  ];

  const selectCategory = (option: {key: string; label: string}) => {
    setSelectedCategory(option.key);
  };

  const [isLoading, setIsLoading] = useState(false);

  const openTab = (photo: string) => {
    try {
      navigation.navigate('OpenPhoto', {
        photoUri: `data:image/jpeg;base64,${photo}`,
      });
      // console.log(photo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async () => {
    await setIsLoading(true);

    try {
      const response = await axios.get(
        `https://which-api.cialabs.tech/get_images/${category}`,
      );

      if (!Array.isArray(response.data)) {
        Alert.alert('Error', 'Invalid image data received from the server.');
        return;
      }

      const base64Images: string[] = await response.data;

      const imageDataList: ImageData[] = await base64Images.map(
        (imageString: string, index: number) => ({
          name: `Image ${index + 1}`,
          data: imageString,
        }),
      );

      await setImages(imageDataList);
    } catch (error) {
      console.error('Error retrieving images:', error);
      Alert.alert('Error', 'Failed to retrieve images. Please try again.');
    }

    await setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ScrollView>
      <View style={[{width: windowWidth}, {height: windowHeight}]}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 32,
            color: 'black',
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Retrieve Image
        </Text>

        <ModalSelector
          data={categories}
          initValueTextStyle={{fontWeight: 'bold', color: 'black'}}
          initValue="Select Category"
          accessible={true}
          onChange={selectCategory}
          selectStyle={{borderWidth: 10}}
          cancelStyle={{borderWidth: 10}}
        />

<TouchableOpacity onPress={fetchImages}>
          <Text style={styles.loadingContainer}>Retrieve Image</Text>
          {isLoading && (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.parent}>
          {images.length === 0 ? (
            <Text>No images available</Text>
          ) : (
            images.map((itemm, index) => (
              <View key={index}>
                {/* <Text>{item.name}</Text> */}

                <TouchableOpacity
                  onPress={() => {
                    // openTab(`data:image/jpeg;base64,${itemm.data}`, index);
                    openTab(itemm.data);
                  }}>
                  <Image
                    style={[styles.child, {width: windowWidth / 3.2}]}
                    source={{uri: `data:image/jpeg;base64,${itemm.data}`}}
                    // style={{width: 200, height: 200, margin: 10}}
                  />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    /* position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background*/
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    padding: 10,
  },
  parent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    margin: 0,
  },
  child: {
    aspectRatio: 1,
    margin: 2,
  },
});

export default RetrieveImageScreen;
