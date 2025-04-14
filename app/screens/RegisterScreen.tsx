import React, { FC, useState } from "react"
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { AppStackScreenProps } from "../navigators"
import {
  GeneralInfo,
  UserType,
  PatientInfo,
  DoctorInfo,
  Address,
  Review,
} from "../components/Registration"
import { useAppTheme } from "../utils/useAppTheme"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const { navigation } = _props
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<"administrator" | "patient" | "doctor" | null>(null)
  const { theme } = useAppTheme()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    document: "",
    phone: "",
    birthdate: "",
    address: {
      zipCode: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
    },

    crm: "",
    specialty: "",
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.password && formData.password === formData.confirmPassword
      case 2:
        return userType !== null
      case 3:
        if (userType === "patient") {
          return formData.document && formData.phone && formData.birthdate
        } else {
          return formData.crm && formData.specialty
        }
      case 4:
        if (userType === "patient") {
          const { address } = formData
          return address.zipCode && address.street && address.number && address.district && address.city && address.state
        }
        return true
      default:
        return true
    }
  }

  const goToNextStep = () => {
    if (validateCurrentStep()) setCurrentStep(currentStep + 1)
  }

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleRegister = () => {
    console.log("Registration data:", formData)
    navigation.navigate("Home")
  }

  const renderProgressIndicator = () => {
    const totalSteps = userType === "patient" ? 5 : (userType === "administrator" ? 3 : 4)

    return (
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 24 }}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1
          const isActive = step === currentStep
          const isPast = step < currentStep

          return (
            <React.Fragment key={step}>
              {index > 0 && (
                <View style={{ height: 1, width: 32, backgroundColor: isPast ? theme.colors.palette.primary500 : theme.colors.palette.neutral400 }} />
              )}
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isActive || isPast ? theme.colors.palette.primary500 : theme.colors.palette.neutral400,
                }}
              >
                {isPast ? (
                  <MaterialCommunityIcons name="check" size={16} color={theme.colors.palette.neutral100} />
                ) : (
                  <Text style={{ color: theme.colors.palette.neutral100, fontSize: 12, fontWeight: "bold" }}>{step}</Text>
                )}
              </View>
            </React.Fragment>
          )
        })}
      </View>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GeneralInfo formData={formData} updateFormData={updateFormData} />
      case 2:
        return <UserType userType={userType} setUserType={setUserType} />
      case 3:
        return userType === "patient"
          ? <PatientInfo formData={formData} updateFormData={updateFormData} />
          : userType === "administrator" ? <Review formData={formData} userType={userType} /> : <DoctorInfo formData={formData} updateFormData={updateFormData} />
      case 4:
        return userType === "patient"
          ? <Address formData={formData} updateFormData={updateFormData} />
          : <Review formData={formData} userType={userType} />
      case 5:
        return <Review formData={formData} userType={userType} />
      default:
        return null
    }
  }

  return (
    <Screen
      preset="fixed"
      statusBarStyle="light"
      contentContainerStyle={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 64 }}>
          {/* Logo & App Name */}
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <MaterialCommunityIcons
              name="stethoscope"
              size={56}
              color={theme.colors.palette.primary500}
            />

            <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.colors.palette.neutral900, marginTop: 8 }}>
              Postinho de Saúde
            </Text>

            <Text style={{ fontSize: 14, color: theme.colors.palette.neutral700, fontWeight: "500", marginTop: 4 }}>
              Cuidando da sua saúde
            </Text>
          </View>

          {/* Title */}
          <Text style={{ fontSize: 20, color: theme.colors.palette.neutral900, fontWeight: "600", textAlign: "center", marginBottom: 16 }}>
            Crie sua conta
          </Text>

          {/* Progress */}
          {renderProgressIndicator()}

          {/* Form content */}
          <View style={{ marginTop: 16 }}>{renderStepContent()}</View>

          {/* Navigation buttons */}
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between", marginTop: 32 }}>
            {currentStep > 1 && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: theme.colors.palette.neutral700,
                  borderRadius: 16,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  flex: 1,
                  marginRight: 8,
                }}
                onPress={goToPreviousStep}
              >
                <Text style={{ color: theme.colors.palette.neutral100, fontSize: 16, fontWeight: "500" }}>Voltar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: theme.colors.palette.primary500,
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 12,
                flex: 1, 
              }}
              onPress={currentStep < (userType === "patient" ? 5 : (userType === "administrator") ? 3 : 4) ? goToNextStep : handleRegister}
            >
              <Text style={{ color: theme.colors.palette.neutral100, fontSize: 16, fontWeight: "500" }}>
                {currentStep < (userType === "patient" ? 5 : (userType === "administrator") ? 3 : 4) ? "Próximo" : "Registrar"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom link */}
          <View style={{ flexDirection: "row", justifyContent: "center", position: "absolute", bottom: 40, left: 0, right: 0 }}>
            <Text style={{ fontSize: 14, color: theme.colors.palette.neutral800, fontWeight: "500", alignSelf: "center" }}>
              Já tem uma conta?{" "}
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate("Login")} 
              accessibilityLabel="Entrar" 
              accessibilityRole="link"
            >
              <Text style={{ fontSize: 14, color: theme.colors.palette.primary300, textDecorationLine: "underline", fontWeight: "500" }}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
})
