import React, { FC, useState } from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import { Text } from "../../components"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAppTheme } from "../../utils/useAppTheme"

interface GeneralInfoProps {
  formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  updateFormData: (data: Partial<typeof formData>) => void
}

const GeneralInfo: FC<GeneralInfoProps> = ({ formData, updateFormData }) => {
  const { theme } = useAppTheme()
  const [focusedField, setFocusedField] = useState<null | keyof typeof formData>(null)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)

  const commonContainer = (isFocused: boolean) =>
    `flex-row items-center bg-[rgba(80,90,110,0.95)] rounded-2xl border px-5 h-16 ${
      isFocused ? "border-primary-300" : "border-primary-500"
    }`
  
  const inputStyle = "flex-1 text-base text-neutral-900 font-body"
  
  return (
    <View>
      <Text className="text-lg font-semibold text-white mb-4 text-center">Informações Gerais</Text>

      {/* Name field */}
      <View className="mb-4">
        <View className={commonContainer(focusedField === "name")}>
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color={theme.colors.palette.primary300}
            className="mr-2"
          />
          <TextInput
            className={inputStyle}
            placeholder="Nome completo"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.name}
            onChangeText={(text) => updateFormData({ name: text })}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            autoCapitalize="words"
          />
        </View>
      </View>

      {/* Email field */}
      <View className="mb-4">
        <View className={commonContainer(focusedField === "email")}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={theme.colors.palette.primary300}
            className="mr-2"
          />
          <TextInput
            className={inputStyle}
            placeholder="E-mail"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.email}
            onChangeText={(text) => updateFormData({ email: text })}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password field */}
      <View className="mb-4">
        <View className={commonContainer(focusedField === "password")}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color={theme.colors.palette.primary300}
            className="mr-2"
          />
          <TextInput
            className={inputStyle}
            placeholder="Senha"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.password}
            onChangeText={(text) => updateFormData({ password: text })}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={isPasswordHidden}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)} className="p-2">
            <MaterialCommunityIcons
              name={isPasswordHidden ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={theme.colors.palette.primary300}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password field */}
      <View className="mb-4">
        <View className={commonContainer(focusedField === "confirmPassword")}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color={theme.colors.palette.primary300}
            className="mr-2"
          />
          <TextInput
            className={inputStyle}
            placeholder="Confirmar senha"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.confirmPassword}
            onChangeText={(text) => updateFormData({ confirmPassword: text })}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={isConfirmPasswordHidden}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
            className="p-2"
          >
            <MaterialCommunityIcons
              name={isConfirmPasswordHidden ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={theme.colors.palette.primary300}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default GeneralInfo