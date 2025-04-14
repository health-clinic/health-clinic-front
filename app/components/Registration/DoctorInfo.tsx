import React, { FC, useState } from "react"
import { View, TextInput } from "react-native"
import { Text } from "../../components"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { spacing } from "../../theme"
import { useAppTheme } from "../../utils/useAppTheme"

interface DoctorInfoProps {
  formData: {
    crm: string
    specialty: string
  }
  updateFormData: (data: Partial<typeof formData>) => void
}

const DoctorInfo: FC<DoctorInfoProps> = ({ formData, updateFormData }) => {
  const { theme } = useAppTheme()
  const [crmFocused, setCrmFocused] = useState(false)
  const [specialtyFocused, setSpecialtyFocused] = useState(false)

  return (
    <View>
      <Text className="text-lg font-medium text-white mb-4 text-center">
        Informações do Profissional
      </Text>
      
      {/* CRM field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: crmFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
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
            placeholder="CRM"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.crm}
            onChangeText={(text) => updateFormData({ crm: text })}
            onFocus={() => setCrmFocused(true)}
            onBlur={() => setCrmFocused(false)}
          />
        </View>
      </View>
      
      {/* Specialty field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: specialtyFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="stethoscope" 
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
            placeholder="Especialidade"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.specialty}
            onChangeText={(text) => updateFormData({ specialty: text })}
            onFocus={() => setSpecialtyFocused(true)}
            onBlur={() => setSpecialtyFocused(false)}
          />
        </View>
      </View>
    </View>
  )
}

export default DoctorInfo