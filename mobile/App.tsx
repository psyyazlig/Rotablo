import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/Root';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      {/* Karanlık Tema (Dark Mode) Rotablo Premium Hissiyatı */}
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  );
}
