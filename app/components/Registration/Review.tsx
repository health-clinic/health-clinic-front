import React, { FC } from "react"
import { View, ScrollView, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface ReviewProps {
  formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
    document?: string
    phone?: string
    birthdate?: string
    crm?: string
    specialty?: string
    address?: {
      zipCode: string
      street: string
      number: string
      district: string
      city: string
      state: string
    }
  }
  userType: "administrator" | "patient" | "doctor" | null
}

const Review: FC<ReviewProps> = ({ formData, userType }) => {
  const renderField = (label: string, value: string) => (
    <View className="mb-3">
      <Text className="text-gray-400 text-xs">{label}</Text>
      <Text className="text-white text-base">{value || "-"}</Text>
    </View>
  )

  return (
    <ScrollView>
      <View>
        <Text className="text-lg font-medium text-white mb-4 text-center">
          Revise suas informações
        </Text>
        
        <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons name="account" size={20} color="#60a5fa" />
            <Text className="text-white font-medium ml-2">Informações Gerais</Text>
          </View>
          {renderField("Nome", formData.name)}
          {renderField("E-mail", formData.email)}
          {renderField("Tipo de Usuário", userType === "patient" ? "Paciente" : (userType === "administrator" ? "Administrador" : "Profissional de Saúde"))}
        </View>
        
        {userType === "patient" ? (
          <>
            <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <MaterialCommunityIcons name="card-account-details" size={20} color="#60a5fa" />
                <Text className="text-white font-medium ml-2">Dados Pessoais</Text>
              </View>
              {renderField("CPF", formData.document || "")}
              {renderField("Telefone", formData.phone || "")}
              {renderField("Data de Nascimento", formData.birthdate || "")}
            </View>
            
            <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <MaterialCommunityIcons name="map-marker" size={20} color="#60a5fa" />
                <Text className="text-white font-medium ml-2">Endereço</Text>
              </View>
              {formData.address && (
                <>
                  {renderField("CEP", formData.address.zipCode)}
                  {renderField("Rua", formData.address.street)}
                  {renderField("Número", formData.address.number)}
                  {renderField("Bairro", formData.address.district)}
                  {renderField("Cidade", formData.address.city)}
                  {renderField("Estado", formData.address.state)}
                </>
              )}
            </View>
          </>
        ) : (
          userType === "administrator" ? (<></>) : (
          <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <MaterialCommunityIcons name="doctor" size={20} color="#60a5fa" />
              <Text className="text-white font-medium ml-2">Dados Profissionais</Text>
            </View>
            {renderField("CRM", formData.crm || "")}
            {renderField("Especialidade", formData.specialty || "")}
          </View>
        ))}
        
        <Text className="text-gray-400 text-sm text-center mt-4">
          Confirme se todos os dados estão corretos antes de finalizar o cadastro.
        </Text>
      </View>
    </ScrollView>
  )
}

export default Review