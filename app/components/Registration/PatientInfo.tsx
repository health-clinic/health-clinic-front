import React, { FC, useState } from "react"
import { View, TextInput, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { spacing } from "../../theme"
import { useAppTheme } from "../../utils/useAppTheme"

interface PatientInfoProps {
  formData: {
    document: string
    phone: string
    birthdate: string
  }
  updateFormData: (data: Partial<typeof formData>) => void
}

const PatientInfo: FC<PatientInfoProps> = ({ formData, updateFormData }) => {
  const { theme } = useAppTheme()
  const [documentFocused, setDocumentFocused] = useState(false)
  const [phoneFocused, setPhoneFocused] = useState(false)
  const [birthdateFocused, setBirthdateFocused] = useState(false)

  return (
    <View>
      <Text className="text-lg font-medium text-white mb-4 text-center">
        Informações do Paciente
      </Text>
      
      {/* Document (CPF) field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: documentFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="card-account-details-outline" 
            size={24} 
            color={theme.colors.palette.primary300} 
            style={{ marginRight: spacing.sm }}
          />
          <TextInput
            style={{ 
              flex: 1,
              color: theme.colors.palette.neutral900,
              fontSize: 16,
              fontFamily: 'interRegular',
              paddingVertical: spacing.xs,
            }}
            placeholder="CPF / Documento"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.document}
            onChangeText={(text) => updateFormData({ document: text })}
            onFocus={() => setDocumentFocused(true)}
            onBlur={() => setDocumentFocused(false)}
            keyboardType="number-pad"
          />
        </View>
      </View>
      
      {/* Phone field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: phoneFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="phone" 
            size={24} 
            color={theme.colors.palette.primary300} 
            style={{ marginRight: spacing.sm }}
          />
          <TextInput
            style={{ 
              flex: 1,
              color: theme.colors.palette.neutral900,
              fontSize: 16,
              fontFamily: 'interRegular',
              paddingVertical: spacing.xs,
            }}
            placeholder="Telefone"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.phone}
            onChangeText={(text) => updateFormData({ phone: text })}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      
      {/* Birthdate field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: birthdateFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="calendar" 
            size={24} 
            color={theme.colors.palette.primary300} 
            style={{ marginRight: spacing.sm }}
          />
          <TextInput
            style={{ 
              flex: 1,
              color: theme.colors.palette.neutral900,
              fontSize: 16,
              fontFamily: 'interRegular',
              paddingVertical: spacing.xs,
            }}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.birthdate}
            onChangeText={(text) => updateFormData({ birthdate: text })}
            onFocus={() => setBirthdateFocused(true)}
            onBlur={() => setBirthdateFocused(false)}
            keyboardType="number-pad"
          />
        </View>
      </View>
    </View>
  )
}

export default PatientInfo