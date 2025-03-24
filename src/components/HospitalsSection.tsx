import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Hospital {
  name: string;
  image: string;
  rating: string;
  distance: string;
}

interface HospitalsSectionProps {
  hospitals: Hospital[];
}

export const HospitalsSection: React.FC<HospitalsSectionProps> = ({ hospitals }) => {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Hospitais Próximos
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      {hospitals.map((hospital, index) => (
        <View key={index} style={styles.hospitalCard}>
          <View style={styles.hospitalImageContainer}>
            <Image
              source={{ uri: hospital.image }}
              style={styles.hospitalImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.hospitalContent}>
            <Text variant="titleMedium" style={styles.hospitalName}>
              {hospital.name}
            </Text>
            <View style={styles.hospitalInfo}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFC107" />
                <Text>{hospital.rating}</Text>
              </View>
              <View style={styles.distanceContainer}>
                <Icon name="map-marker" size={16} color={theme.colors.primary} />
                <Text>{hospital.distance}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#2196F3',
    fontSize: 14,
  },
  hospitalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 16,
  },
  hospitalImageContainer: {
    height: 140,
    backgroundColor: '#E0E0E0',
  },
  hospitalImage: {
    width: '100%',
    height: '100%',
  },
  hospitalContent: {
    padding: 12,
  },
  hospitalName: {
    fontWeight: '600',
  },
  hospitalInfo: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
