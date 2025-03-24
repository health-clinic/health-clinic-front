import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const BottomNavigation: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.bottomNavItem}>
        <Icon name="home" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomNavItem}>
        <Icon name="calendar" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomNavItem}>
        <Icon name="message" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomNavItem}>
        <Icon name="heart" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomNavItem}>
        <Icon name="account" size={24} color="#757575" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bottomNavItem: {
    alignItems: 'center',
  },
});
