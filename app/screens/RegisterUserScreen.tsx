import React, { FC, useState } from "react"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { observer } from "mobx-react-lite"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { AppStackScreenProps } from "../navigators"
import {
  Address,
  DoctorInfo,
  GeneralInfo,
  PatientInfo,
  Review,
  UserType,
} from "../components/Registration"
import { useAppTheme } from "../utils/useAppTheme"

interface RegisterUserScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterUserScreen: FC<RegisterUserScreenProps> = observer(
  function RegisterUserScreen(_props) {
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
          return (
            formData.name &&
            formData.email &&
            formData.password &&
            formData.password === formData.confirmPassword
          )
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
            return (
              address.zipCode &&
              address.street &&
              address.number &&
              address.district &&
              address.city &&
              address.state
            )
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

    const register = () => {
      console.log("Registration data:", formData)
      navigation.navigate("Home")
    }

    const renderProgressIndicator = () => {
      const totalSteps = userType === "patient" ? 5 : userType === "administrator" ? 3 : 4

      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 24,
          }}
        >
          {Array.from({ length: totalSteps }).map((_, index) => {
            const step = index + 1
            const isActive = step === currentStep
            const isPast = step < currentStep

            return (
              <React.Fragment key={step}>
                {index > 0 && (
                  <View
                    style={{
                      height: 1,
                      width: 32,
                      backgroundColor: isPast
                        ? theme.colors.palette.primary500
                        : theme.colors.palette.neutral400,
                    }}
                  />
                )}
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      isActive || isPast
                        ? theme.colors.palette.primary500
                        : theme.colors.palette.neutral400,
                  }}
                >
                  {isPast ? (
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color={theme.colors.palette.neutral100}
                    />
                  ) : (
                    <Text
                      style={{
                        color: theme.colors.palette.neutral100,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {step}
                    </Text>
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
          return userType === "patient" ? (
            <PatientInfo formData={formData} updateFormData={updateFormData} />
          ) : userType === "administrator" ? (
            <Review formData={formData} userType={userType} />
          ) : (
            <DoctorInfo formData={formData} updateFormData={updateFormData} />
          )
        case 4:
          return userType === "patient" ? (
            <Address formData={formData} updateFormData={updateFormData} />
          ) : (
            <Review formData={formData} userType={userType} />
          )
        case 5:
          return <Review formData={formData} userType={userType} />
        default:
          return null
      }
    }

    return (
      <View className="flex-1 bg-background">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <View className="flex-1 justify-between">
            <ScrollView className="flex-grow px-6 pt-10 pb-6">
              {/* Header */}
              <View className="flex-row items-center justify-center mb-10">
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{ width: 64, height: 64 }}
                  resizeMode="contain"
                />

                <View className="ml-2">
                  <Text className="text-3xl font-bold text-neutral-900">Postinho de Saúde</Text>
                  <Text className="text-lg font-medium text-neutral-700">
                    Cuidando da sua saúde
                  </Text>
                </View>
              </View>

              {/* Title */}
              <Text className="text-xl text-neutral-900 font-semibold text-center mb-4">
                Crie sua conta
              </Text>

              {/* Progress Indicator */}
              {renderProgressIndicator()}

              {/* Step Content */}
              <View className="mt-4">{renderStepContent()}</View>

              {/* Navigation Buttons */}
              <View className="flex-row flex-wrap justify-between mt-8">
                {currentStep > 1 && (
                  <TouchableOpacity
                    onPress={goToPreviousStep}
                    className="flex-1 mr-2 flex-row justify-center bg-neutral-700 rounded-xl px-5 py-3"
                  >
                    <Text className="text-neutral-100 text-base font-medium">Voltar</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={
                    currentStep <
                    (userType === "patient" ? 5 : userType === "administrator" ? 3 : 4)
                      ? goToNextStep
                      : register
                  }
                  className="flex-1 flex-row justify-center items-center py-4 rounded-xl bg-primary-500"
                >
                  <Text className="text-base font-bold text-neutral-900">
                    {currentStep <
                    (userType === "patient" ? 5 : userType === "administrator" ? 3 : 4)
                      ? "Próximo"
                      : "Registrar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Bottom Link Fixed to Bottom */}
            <View className="flex-row justify-center items-center pb-8">
              <Text className="text-sm text-neutral-800 font-medium">Já tem uma conta? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                accessibilityLabel="Entrar"
                accessibilityRole="link"
              >
                <Text className="text-sm text-primary-300 font-medium underline">Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  },
)
