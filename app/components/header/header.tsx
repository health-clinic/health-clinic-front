import React, { FC } from "react"
import { Surface, Text, Searchbar, Avatar, Badge, IconButton } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../../theme"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const Header: FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <Surface className="bg-primary pt-5 h-[280px] rounded-b-[20px]">
      <SafeAreaView>
        <Surface className="px-4 pt-2 pb-5 bg-transparent">
          <Surface className="flex-row justify-between items-center bg-transparent">
            <Surface className="flex-row items-center bg-transparent">
              <Avatar.Image 
                size={48} 
                source={{ uri: "https://example.com/avatar.jpg" }} 
                style={{ borderWidth: 2, borderColor: "white", marginRight: 12 }}
              />
              <Surface className="mb-1 bg-transparent">
                <Text className="text-white font-bold text-xl">
                  Olá, Kawsa,
                </Text>
                <Text className="text-white opacity-80 text-sm mt-1">
                  Bem-vindo de volta!
                </Text>
              </Surface>
            </Surface>
            <Surface className="flex-row bg-transparent">
              <IconButton
                icon="magnify"
                iconColor="white"
                size={24}
                className="m-0 bg-transparent"
                onPress={() => {}}
              />
              <Surface className="relative bg-transparent ml-4">
                <IconButton
                  icon="bell"
                  iconColor="white"
                  size={24}
                  className="m-0 bg-transparent"
                  onPress={() => {}}
                />
                <Badge 
                  className="absolute -top-[5px] -right-[5px]"
                  style={{ backgroundColor: colors.accent }}
                >2</Badge>
              </Surface>
            </Surface>
          </Surface>
          <Surface className="p-4 bg-transparent">
            <Searchbar
              placeholder="Pesquisar médicos, clínicas..."
              onChangeText={onSearchChange}
              value={searchQuery}
              className="rounded-xl bg-white"
              style={{ elevation: 2 }}
              iconColor="#757575"
              placeholderTextColor="#757575"
              elevation={0}
            />
          </Surface>
        </Surface>
      </SafeAreaView>
    </Surface>
  )
}
