import React, { FC } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface Service {
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  title: string
  color: string
}

interface ServicesGridProps {
  services: Service[]
}

export const ServicesGrid: FC<ServicesGridProps> = ({ services }) => {
  return (
    <View className="absolute top-[160px] left-0 right-0 z-10 px-4">
      <View className="flex-row flex-wrap justify-between bg-white rounded-2xl p-4 shadow-md">
        {services.map((service, index) => (
          <TouchableOpacity 
            key={index} 
            className="w-1/3 items-center mb-6" 
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <View 
              className="w-[60px] h-[60px] rounded-xl justify-center items-center mb-2"
              style={{ backgroundColor: service.color }}
            >
              <MaterialCommunityIcons name={service.icon} size={28} color="white" />
            </View>
            <Text className="text-center text-xs font-medium text-[#333333] max-w-[80px]" numberOfLines={2}>
              {service.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
