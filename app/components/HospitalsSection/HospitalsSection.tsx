import React, { FC } from "react"
import { View, TouchableOpacity, Image, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "../../theme"

interface Hospital {
  name: string
  image: string
  rating: string
  distance: string
}

interface HospitalsSectionProps {
  hospitals: Hospital[]
}

export const HospitalsSection: FC<HospitalsSectionProps> = ({ hospitals }) => {
  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-[#333333]">
          Hospitais Próximos
        </Text>
        <TouchableOpacity>
          <Text className="text-primary text-sm font-medium">Ver todos</Text>
        </TouchableOpacity>
      </View>
      {hospitals.map((hospital, index) => (
        <TouchableOpacity 
          key={index} 
          className="bg-white rounded-2xl overflow-hidden shadow-md mb-4"
          activeOpacity={0.7}
        >
          <View className="h-[140px] bg-[#E0E0E0]">
            <Image
              source={{ uri: hospital.image }}
              className="w-full h-full"
              resizeMode="cover"
              style={{ backgroundColor: '#E0E0E0' }}
            />
          </View>
          <View className="p-4">
            <Text className="text-base font-semibold text-[#333333]">
              {hospital.name}
            </Text>
            <View className="flex-row mt-2 gap-4">
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
                <Text className="ml-1 text-[#555555]">{hospital.rating}</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="map-marker" size={16} color={colors.primary} />
                <Text className="ml-1 text-[#555555]">{hospital.distance}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
