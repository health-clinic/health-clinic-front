import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme, Searchbar, Avatar, Badge, Surface, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const theme = useTheme();

  return (
    <Surface style={styles.headerBackground}>
      <SafeAreaView>
        <Surface style={styles.header}>
          <Surface style={styles.headerTop}>
            <Surface style={styles.userInfo}>
              <Avatar.Image 
                size={48} 
                source={{ uri: 'https://example.com/avatar.jpg' }} 
                style={styles.userAvatar}
              />
              <Surface style={styles.userText}>
                <Text variant="titleMedium" style={styles.headerTitle}>
                  Olá, Kawsa,
                </Text>
                <Text variant="bodySmall" style={styles.headerSubtitle}>
                  Bem-vindo de volta!
                </Text>
              </Surface>
            </Surface>
            <Surface style={styles.headerIcons}>
              <IconButton
                icon="magnify"
                iconColor="white"
                size={24}
                style={styles.iconButton}
                onPress={() => {}}
              />
              <Surface style={[styles.iconButtonContainer, { marginLeft: 16 }]}>
                <IconButton
                  icon="bell"
                  iconColor="white"
                  size={24}
                  style={styles.iconButton}
                  onPress={() => {}}
                />
                <Badge style={styles.badge}>2</Badge>
              </Surface>
            </Surface>
          </Surface>
          <Surface style={styles.searchBarContainer}>
            <Searchbar
              placeholder="Pesquisar médicos, clínicas..."
              onChangeText={onSearchChange}
              value={searchQuery}
              style={styles.searchBar}
              iconColor="#757575"
              placeholderTextColor="#757575"
              elevation={0}
            />
          </Surface>
        </Surface>
      </SafeAreaView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#2196F3',
    paddingTop: 20,
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  userAvatar: {
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 12,
  },
  userText: {
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerSubtitle: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  iconButton: {
    margin: 0,
    backgroundColor: 'transparent',
  } as ViewStyle,
  iconButtonContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
  } as ViewStyle,
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4081',
  },
  searchBarContainer: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
  },
});
