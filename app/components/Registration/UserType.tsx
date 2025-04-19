import React, { FC } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface UserTypeProps {
  userType: "administrator" | "patient" | "doctor" | null
  setUserType: (type: "administrator" | "patient" | "doctor") => void
}

const UserType: FC<UserTypeProps> = ({ userType, setUserType }) => {
  return (
    <View>
      <Text className="text-lg font-medium text-white mb-4 text-center">
        Tipo de usuário
      </Text>

      <View className="flex-row gap-4 justify-center">
        {/* Administrador */}
        <TouchableOpacity 
          className={`flex-1 border rounded-lg p-6 items-center ${userType === "administrator" ? "border-primary bg-blue-900/30" : "border-gray-700"}`}
          onPress={() => setUserType("administrator")}
        >
          <MaterialCommunityIcons 
            name="shield-account" 
            size={48} 
            color={userType === "administrator" ? "#2196F3" : "#9ca3af"} 
          />
          <Text className={`mt-3 font-medium text-center ${userType === "administrator" ? "text-primary" : "text-gray-400"}`}>
            Administrador
          </Text>
        </TouchableOpacity>

        {/* Paciente */}
        <TouchableOpacity 
          className={`flex-1 border rounded-lg p-6 items-center ${userType === "patient" ? "border-primary bg-blue-900/30" : "border-gray-700"}`}
          onPress={() => setUserType("patient")}
        >
          <MaterialCommunityIcons 
            name="account" 
            size={48} 
            color={userType === "patient" ? "#2196F3" : "#9ca3af"} 
          />
          <Text className={`mt-3 font-medium text-center ${userType === "patient" ? "text-primary" : "text-gray-400"}`}>
            Paciente
          </Text>
        </TouchableOpacity>

        {/* Profissional de saúde */}
        <TouchableOpacity 
          className={`flex-1 border rounded-lg p-6 items-center ${userType === "doctor" ? "border-primary bg-blue-900/30" : "border-gray-700"}`}
          onPress={() => setUserType("doctor")}
        >
          <MaterialCommunityIcons 
            name="doctor" 
            size={48} 
            color={userType === "doctor" ? "#2196F3" : "#9ca3af"} 
          />
          <Text className={`mt-3 font-medium text-center ${userType === "doctor" ? "text-primary" : "text-gray-400"}`}>
            Profissional de saúde
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserType
