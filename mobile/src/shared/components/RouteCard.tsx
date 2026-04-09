import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

interface RouteCardProps {
  route: {
    id: string;
    code: string;
    name: string;
    plannedDistanceKm: number;
    plannedStageCount: number;
    heroAssetUrl?: string; // Optional image
  };
  onPress: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onPress }) => {
  // Varsayılan gösterişli bir dağ/yol arka planı (Katalog mock amaçlı)
  const defaultImage = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.container}>
      <ImageBackground 
        source={{ uri: route.heroAssetUrl || defaultImage }} 
        style={styles.imageBg}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay}>
          {/* Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{route.code}</Text>
          </View>

          {/* Texts */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>{route.name}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{route.plannedDistanceKm} <Text style={styles.statLabel}>km</Text></Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{route.plannedStageCount} <Text style={styles.statLabel}>etap</Text></Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    height: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 20, // Rounded premium köşeler
  },
  overlay: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark gradient effect
    padding: 20,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  badgeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  textContainer: {
    marginTop: 'auto',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    color: '#FFD700', // Rotablo accent gold
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  statDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 12,
  }
});
