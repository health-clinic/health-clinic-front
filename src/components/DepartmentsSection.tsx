import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

interface Department {
  icon: string;
  title: string;
  sessions: string;
  color: string;
}

interface DepartmentsSectionProps {
  departments: Department[];
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({ departments }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Departamentos
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.departmentsScroll}
      >
        {departments.map((dept, index) => (
          <TouchableOpacity key={index} style={styles.departmentCard}>
            <Avatar.Icon 
              size={50} 
              icon={dept.icon}
              style={{ backgroundColor: dept.color }}
            />
            <Text style={styles.departmentTitle}>{dept.title}</Text>
            <Text style={styles.departmentSessions}>{dept.sessions}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  departmentsScroll: {
    paddingRight: 16,
    gap: 16,
  },
  departmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 120,
    elevation: 2,
  },
  departmentTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  departmentSessions: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
});
