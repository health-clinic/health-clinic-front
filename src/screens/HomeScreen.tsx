import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { ServicesGrid } from '../components/ServicesGrid';
import { DepartmentsSection } from '../components/DepartmentsSection';
import { HospitalsSection } from '../components/HospitalsSection';
import { BottomNavigation } from '../components/BottomNavigation';

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const services = [
    { icon: 'hospital-building', title: 'Consulta\nClínica', color: '#2196F3' },
    { icon: 'home', title: 'Consulta\nDomiciliar', color: '#2196F3' },
    { icon: 'video', title: 'Consulta\nOnline', color: '#2196F3' },
    { icon: 'pill', title: 'Farmácia', color: '#2196F3' },
    { icon: 'virus', title: 'Doenças', color: '#2196F3' },
    { icon: 'shield-virus', title: 'Covid-19', color: '#2196F3' },
  ];

  const departments = [
    {
      icon: 'doctor',
      title: 'Clínica Geral',
      sessions: '123 Sessões',
      color: '#2196F3'
    },
    {
      icon: 'heart-pulse',
      title: 'Pediatria',
      sessions: '150 Sessões',
      color: '#FF4081'
    },
    {
      icon: 'heart',
      title: 'Cardiologia',
      sessions: '98 Sessões',
      color: '#4CAF50'
    }
  ];

  const hospitals = [
    {
      name: 'Hospital São Lucas',
      image: 'https://example.com/hospital1.jpg',
      rating: '4.8',
      distance: '1.2 km'
    },
    {
      name: 'Hospital Albert Einstein',
      image: 'https://example.com/hospital2.jpg',
      rating: '4.9',
      distance: '2.5 km'
    }
  ];

  return (
    <View style={styles.container}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ServicesGrid services={services} />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DepartmentsSection departments={departments} />
        <HospitalsSection hospitals={hospitals} />
      </ScrollView>

      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    marginTop: 140,
  },
  scrollContent: {
    padding: 16,
  },
});
