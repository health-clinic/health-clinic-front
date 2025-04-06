import React, { FC } from "react"
import { View, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "../../theme"

export const BottomNavigation: FC = () => {
  const theme = useTheme()

  return (
    <View className="flex-row justify-around items-center bg-white py-3 border-t border-t-[#E0E0E0]">
      <TouchableOpacity className="items-center">
        <MaterialCommunityIcons name="home" size={24} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity className="items-center">
        <MaterialCommunityIcons name="calendar" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity className="items-center">
        <MaterialCommunityIcons name="message" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity className="items-center">
        <MaterialCommunityIcons name="heart" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity className="items-center">
        <MaterialCommunityIcons name="account" size={24} color="#757575" />
      </TouchableOpacity>
    </View>
  )
}
