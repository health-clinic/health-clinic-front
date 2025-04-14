import React, { FC } from "react"
import { View, TouchableOpacity, ScrollView, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "../../theme"

interface Department {
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  title: string
  sessions: string
  color: keyof typeof colors | string
}

interface DepartmentsSectionProps {
  departments: Department[]
}

export const DepartmentsSection: FC<DepartmentsSectionProps> = ({ departments }) => {
  // Function to get the color based on the department
  const getDepartmentColor = (title: string): string => {
    switch (title) {
      case "Clínica Geral":
        return '#2196F3'
      case "Pediatria":
        return "#FF4081" // Pink color for Pediatria
      case "Cardiologia":
        return '#2196F3'
      default:
        return '#2196F3'
    }
  }

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-[#333333]">
          Departamentos
        </Text>
        <TouchableOpacity>
          <Text className="text-[#2196F3] text-sm font-medium">Ver todos</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pr-4 gap-4"
      >
        {departments.map((dept, index) => (
          <TouchableOpacity 
            key={index} 
            className="bg-white rounded-2xl p-4 items-center w-[120px]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2
            }}
            activeOpacity={0.7}
          >
            <View 
              className="w-[60px] h-[60px] rounded-full justify-center items-center mb-3"
              style={{ backgroundColor: getDepartmentColor(dept.title) }}
            >
              <MaterialCommunityIcons name={dept.icon} size={28} color="white" />
            </View>
            <Text className="text-sm font-semibold text-center text-[#333333]">{dept.title}</Text>
            <Text className="text-xs text-[#757575] mt-1">{dept.sessions}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
