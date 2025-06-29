import React, { FC, ReactElement, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useStores } from "@/models"
import { showErrorToast } from "@/components/toast"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { ForgotPassword } from "@/screens/Authentication"
import { StepIndicator } from "@/components/StepIndicator"
import { ChevronLeft, KeyRound } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"

type StepId = "sendCodeConfirmation" | "codeConfirmation" | "resetPassword"

interface ForgotPasswordFormProps {
  onSubmit: (email: string, password: string) => void
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
}: ForgotPasswordFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()
  const { loadingStore } = useStores()

  const [currentStep, setCurrentStep] = useState<StepId>("sendCodeConfirmation")
  const [email, setEmail] = useState<string>("")

  const generateCode = async (email: string): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAuthenticationApi(api).sendForgotPasswordMail(email)
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      setEmail(email)
      setCurrentStep("codeConfirmation")
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const isMatchCode = async (code: string): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAuthenticationApi(api).isCodeMatch(email, code)
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      const { match } = response
      if (!match) {
        throw new Error("Código preenchido está incorreto.")
      }

      setCurrentStep("resetPassword")
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const resendCode = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAuthenticationApi(api).sendForgotPasswordMail(email)
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep === "sendCodeConfirmation") {
      // Handle navigation to login screen - will be handled by individual step components
    } else if (currentStep === "codeConfirmation") {
      setCurrentStep("sendCodeConfirmation")
    } else if (currentStep === "resetPassword") {
      setCurrentStep("codeConfirmation")
    }
  }

  const getStepInfo = () => {
    switch (currentStep) {
      case "sendCodeConfirmation":
        return {
          step: 1,
          title: "Recuperar senha",
          description: "Informe seu e-mail para receber o código de verificação.",
        }
      case "codeConfirmation":
        return {
          step: 2,
          title: "Código de verificação",
          description: "Digite o código de 6 dígitos enviado para seu e-mail.",
        }
      case "resetPassword":
        return {
          step: 3,
          title: "Nova senha",
          description: "Crie uma nova senha para sua conta.",
        }
      default:
        return {
          step: 1,
          title: "Recuperar senha",
          description: "Informe seu e-mail para receber o código de verificação.",
        }
    }
  }

  const stepInfo = getStepInfo()

  const renderStepContent = () => {
    switch (currentStep) {
      case "sendCodeConfirmation":
        return (
          <ForgotPassword.Form.SendCodeConfirmation onSubmit={generateCode} onBack={handleBack} />
        )
      case "codeConfirmation":
        return (
          <ForgotPassword.Form.CodeConfirmation
            email={email}
            onSubmit={isMatchCode}
            onResendCode={resendCode}
            onBack={handleBack}
          />
        )
      case "resetPassword":
        return (
          <ForgotPassword.Form.ResetPassword
            email={email}
            onSubmit={onSubmit}
            onBack={handleBack}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <View className="flex-1">
      <View className="flex-1">{renderStepContent()}</View>
    </View>
  )
}
