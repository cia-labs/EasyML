
// Menu.tsx
import React from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

interface MenuProps {
  navigation: any;
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 48, color: 'black', textAlign: 'center', padding:20, marginTop:20, marginBottom: 50 }}>WhichImages</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 32, color: 'black', textAlign: 'center', marginBottom: 50 }}>MENU</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('AddImage')}>
          <View style={{ alignItems: 'center' }}>
            <Icon name="id-badge" size={50} color="green">
             </Icon>  
            <Text style={{ color: 'green' }}>Add Image</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RetrieveImageScreen')}>
          <View style={{ alignItems: 'center' }}>
            <Icon name="suitcase" size={50} color="blue">
              </Icon>
            <Text style={{ color: 'blue' }}>Retrieve Image</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;
