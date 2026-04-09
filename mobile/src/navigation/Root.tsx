import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppStore } from '../store/useAppStore';
import { RouteCatalogScreen } from '../features/catalog/RouteCatalogScreen';
import { VehicleProfileForm } from '../features/vehicles/VehicleProfileForm';

// Stub Componentlar (Daha sonra features/ klasörüne ayrılacak)
const TripPlannerScreen  = () => <View style={styles.center}><Text>Planlayıcı & Bütçe</Text></View>;

// Stack tanımları
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

// Ana Sekmeler
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Catalog" component={RouteCatalogScreen} options={{ title: 'Rotalar' }} />
      <Tab.Screen name="Trips" component={TripPlannerScreen} options={{ title: 'Planlarım' }} />
      <Tab.Screen name="Profile" component={VehicleProfileForm} options={{ title: 'Garaj' }} />
    </Tab.Navigator>
  );
}

// Global Navigasyon Kökü
export function RootNavigator() {
  const hasCompletedOnboarding = useAppStore(state => state.hasCompletedOnboarding);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {/* V1 için direkt ana ekranlara atlıyoruz, ileride Auth/Onboarding konabilir */}
      <RootStack.Screen name="Main" component={MainTabs} />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
});
