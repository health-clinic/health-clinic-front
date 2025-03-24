import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Service {
  icon: string;
  title: string;
  color: string;
}

interface ServicesGridProps {
  services: Service[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <View style={styles.servicesContainer}>
      <View style={styles.servicesGrid}>
        {services.map((service, index) => (
          <TouchableOpacity key={index} style={styles.serviceItem}>
            <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
              <Icon name={service.icon} size={24} color="white" />
            </View>
            <Text style={styles.serviceTitle}>
              {service.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  serviceItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
  },
});
