//AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './Components/Menu';
import AddImage from './Components/AddImage';
import RetrieveImageScreen from './Components/RetrieveImageScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Group>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="AddImage" component={AddImage} />
        <Stack.Screen name="RetrieveImageScreen" component={RetrieveImageScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
