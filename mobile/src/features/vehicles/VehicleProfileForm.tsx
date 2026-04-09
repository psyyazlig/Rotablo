import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';

const BODY_TYPES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Wagon'];
const DRIVETRAINS = ['FWD', 'RWD', 'AWD', '4x4'];

export const VehicleProfileForm = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [bodyType, setBodyType] = useState('SUV');
  const [drivetrain, setDrivetrain] = useState('AWD');
  const [clearance, setClearance] = useState('Ortalama'); // Düşük, Ortalama, Yüksek
  const [tireSeason, setTireSeason] = useState('4 Mevsim'); // Yaz, Kış, 4 Mevsim

  const handleSave = () => {
    if (!brand || !model) {
      Alert.alert('Eksik Bilgi', 'Lütfen Marka ve Model alanlarını doldurun.');
      return;
    }
    // Burada API call veya Zustand deposuna kayıt yapılacak
    Alert.alert('Kaydedildi', `${brand} ${model} garajınıza eklendi!`);
  };

  const renderChips = (options: string[], selected: string, onSelect: (val: string) => void) => (
    <View style={styles.chipContainer}>
      {options.map((opt) => (
        <TouchableOpacity 
          key={opt} 
          style={[styles.chip, selected === opt && styles.chipSelected]}
          onPress={() => onSelect(opt)}
        >
          <Text style={[styles.chipText, selected === opt && styles.chipTextSelected]}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Araç Profili</Text>
          <Text style={styles.headerTitle}>Yeni Araç Ekle</Text>
          <Text style={styles.headerDesc}>
            V1 Kararları uyarınca, zorluk ve uyarı sınırlarını belirlemek için 6 temel alanı doldurmalısınız.
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Marka</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Örn: Subaru" 
            placeholderTextColor="#666"
            value={brand}
            onChangeText={setBrand}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Model</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Örn: Forester" 
            placeholderTextColor="#666"
            value={model}
            onChangeText={setModel}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Gövde Tipi</Text>
          {renderChips(BODY_TYPES, bodyType, setBodyType)}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Drivetrain (Çekiş)</Text>
          {renderChips(DRIVETRAINS, drivetrain, setDrivetrain)}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Yerden Yükseklik (Clearance)</Text>
          {renderChips(['Düşük', 'Ortalama', 'Yüksek'], clearance, setClearance)}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Lastik Durumu</Text>
          {renderChips(['Yaz', '4 Mevsim', 'Kış'], tireSeason, setTireSeason)}
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Aracı Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F13' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 30 },
  headerSubtitle: { color: '#FFD700', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', marginBottom: 8 },
  headerDesc: { color: '#888', fontSize: 14, lineHeight: 20 },
  formGroup: { marginBottom: 24 },
  label: { color: '#E0E0E0', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: '#1C1C21',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    backgroundColor: '#1C1C21',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: 'rgba(255, 215, 0, 0.15)', borderColor: '#FFD700' },
  chipText: { color: '#888', fontSize: 14, fontWeight: '600' },
  chipTextSelected: { color: '#FFD700' },
  saveButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: { color: '#0F0F13', fontSize: 16, fontWeight: '800', textTransform: 'uppercase' }
});
