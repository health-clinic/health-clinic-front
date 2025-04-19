import React, { FC, useState } from "react"
import { View, TextInput, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { spacing } from "../../theme"
import { useAppTheme } from "../../utils/useAppTheme"

interface AddressProps {
  formData: {
    address: {
      zipCode: string
      street: string
      number: string
      district: string
      city: string
      state: string
    }
  }
  updateFormData: (data: Partial<typeof formData>) => void
}

const Address: FC<AddressProps> = ({ formData, updateFormData }) => {
  const { theme } = useAppTheme()
  const [zipCodeFocused, setZipCodeFocused] = useState(false)
  const [streetFocused, setStreetFocused] = useState(false)
  const [numberFocused, setNumberFocused] = useState(false)
  const [districtFocused, setDistrictFocused] = useState(false)
  const [cityFocused, setCityFocused] = useState(false)
  const [stateFocused, setStateFocused] = useState(false)

  const updateAddress = (field: string, value: string) => {
    updateFormData({
      address: {
        ...formData.address,
        [field]: value
      }
    } as any)
  }

  // Function to auto-fill address fields based on CEP
  const fetchAddressByCep = async () => {
    try {
      if (formData.address.zipCode.length === 8) {
        // In a real app, you would call an API here
        // For demo purposes, we'll just simulate a successful response
        setTimeout(() => {
          updateFormData({
            address: {
              ...formData.address,
              street: "Rua Exemplo",
              district: "Bairro Teste",
              city: "São Paulo",
              state: "SP"
            }
          } as any)
        }, 1000)
      }
    } catch (error) {
      console.error("Error fetching address:", error)
    }
  }

  return (
    <View>
      <Text className="text-lg font-medium text-white mb-4 text-center">
        Endereço
      </Text>
      
      {/* CEP field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: zipCodeFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="map-marker" 
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
            placeholder="CEP"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.address.zipCode}
            onChangeText={(text) => updateAddress("zipCode", text)}
            onBlur={fetchAddressByCep}
            onFocus={() => setZipCodeFocused(true)}
            onBlur={() => {
              setZipCodeFocused(false)
              fetchAddressByCep()
            }}
            keyboardType="number-pad"
          />
        </View>
      </View>
      
      {/* Street field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: streetFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="road" 
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
            placeholder="Rua"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.address.street}
            onChangeText={(text) => updateAddress("street", text)}
            onFocus={() => setStreetFocused(true)}
            onBlur={() => setStreetFocused(false)}
          />
        </View>
      </View>
      
      {/* Number field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: numberFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="numeric" 
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
            placeholder="Número"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.address.number}
            onChangeText={(text) => updateAddress("number", text)}
            onFocus={() => setNumberFocused(true)}
            onBlur={() => setNumberFocused(false)}
            keyboardType="number-pad"
          />
        </View>
      </View>
      
      {/* District field */}
      <View style={{ marginBottom: spacing.md }}>
        <View 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(80, 90, 110, 0.95)',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: districtFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            height: 60,
            ...theme.shadows.input,
          }}
        >
          <MaterialCommunityIcons 
            name="home-city" 
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
            placeholder="Bairro"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={formData.address.district}
            onChangeText={(text) => updateAddress("district", text)}
            onFocus={() => setDistrictFocused(true)}
            onBlur={() => setDistrictFocused(false)}
          />
        </View>
      </View>
      
      {/* City and State fields in a row */}
      <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md }}>
        <View style={{ flex: 1 }}>
          <View 
            style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(80, 90, 110, 0.95)',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: cityFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              height: 60,
              ...theme.shadows.input,
            }}
          >
            <MaterialCommunityIcons 
              name="city" 
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
              placeholder="Cidade"
              placeholderTextColor={theme.colors.palette.neutral600}
              value={formData.address.city}
              onChangeText={(text) => updateAddress("city", text)}
              onFocus={() => setCityFocused(true)}
              onBlur={() => setCityFocused(false)}
            />
          </View>
        </View>
        
        <View style={{ width: 100 }}>
          <View 
            style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(80, 90, 110, 0.95)',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: stateFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              height: 60,
              ...theme.shadows.input,
            }}
          >
            <MaterialCommunityIcons 
              name="map" 
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
              placeholder="UF"
              placeholderTextColor={theme.colors.palette.neutral600}
              value={formData.address.state}
              onChangeText={(text) => updateAddress("state", text)}
              onFocus={() => setStateFocused(true)}
              onBlur={() => setStateFocused(false)}
              maxLength={2}
              autoCapitalize="characters"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Address