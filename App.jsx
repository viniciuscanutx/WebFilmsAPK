import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'; 
import HomeScreen from './src/pages/Home';
import MovieDetails from './src/pages/Details';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#011627" 
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#011627', 
            borderBottomWidth: 0, 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
          headerTitleAlign: 'center', 
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Movies' }} 
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetails} 
          options={{ title: 'Watch' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
