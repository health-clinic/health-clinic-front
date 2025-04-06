import React, { FC } from "react"
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "../../theme"

export interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const Header: FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <View className="bg-primary pt-5 h-[280px] rounded-b-[20px]">
      <SafeAreaView>
        <View className="px-4 pt-2 pb-5">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-white mr-3">
                <Image 
                  source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} 
                  className="w-full h-full"
                />
              </View>
              <View className="mb-1">
                <Text className="text-white font-bold text-xl">
                  Olá, Kawsa,
                </Text>
                <Text className="text-white opacity-80 text-sm mt-1">
                  Bem-vindo de volta!
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <TouchableOpacity 
                className="p-2" 
                onPress={() => {}}
              >
                <MaterialCommunityIcons name="magnify" size={24} color="white" />
              </TouchableOpacity>
              <View className="relative ml-4">
                <TouchableOpacity 
                  className="p-2" 
                  onPress={() => {}}
                >
                  <MaterialCommunityIcons name="bell" size={24} color="white" />
                </TouchableOpacity>
                <View className="absolute -top-[5px] -right-[5px] bg-[#FF4081] w-5 h-5 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">2</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-4">
            <View className="flex-row items-center bg-white rounded-xl px-3 h-12 shadow-sm">
              <MaterialCommunityIcons name="magnify" size={20} color="#757575" />
              <TextInput
                placeholder="Pesquisar médicos, clínicas..."
                onChangeText={onSearchChange}
                value={searchQuery}
                className="flex-1 ml-2 text-[#333333]"
                placeholderTextColor="#757575"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
