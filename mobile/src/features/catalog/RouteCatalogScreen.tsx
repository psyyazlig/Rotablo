import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { RouteCard } from '../../shared/components/RouteCard';

// V1 için Test Verileri (Normalde API'den gelecek)
const MOCK_ROUTES = [
  {
    id: 'r01',
    code: 'R01',
    name: "Trakya'dan Ege'ye Boğazlar ve Bağlar",
    plannedDistanceKm: 7300,
    plannedStageCount: 37,
    heroAssetUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'r02',
    code: 'R02',
    name: "İç Anadolu Bozkırları ve Kanyon Geçişi",
    plannedDistanceKm: 1240,
    plannedStageCount: 12,
    heroAssetUrl: 'https://images.unsplash.com/photo-1473215286419-f027fc6fe50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'r03',
    code: 'R03',
    name: "Karadeniz Yaylaları Klasik Rotası",
    plannedDistanceKm: 850,
    plannedStageCount: 8,
    heroAssetUrl: 'https://images.unsplash.com/photo-1542302302-36fb2fdcf0db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

export const RouteCatalogScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Küratörlü Yollar</Text>
        <Text style={styles.headerTitle}>Rota Kataloğu</Text>
      </View>

      {/* Rota Listesi */}
      <FlatList
        data={MOCK_ROUTES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <RouteCard 
            route={item} 
            onPress={() => console.log('Rota Tıklandı:', item.code)} 
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F13', // Premium absolute dark background
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerSubtitle: {
    color: '#FFD700', // Altın sarısı (accent)
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  listContent: {
    paddingBottom: 40,
    paddingTop: 10,
  }
});
