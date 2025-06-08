import { FC, ReactElement, useState } from "react"
import { useStores } from "@/models"
import { showErrorToast } from "@/components/toast"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { ForgotPassword } from "@/screens/Authentication"

type StepId = "sendCodeConfirmation" | "codeConfirmation" | "resetPassword"

interface ForgotPasswordFormProps {
  onSubmit: (email: string, password: string) => void
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
}: ForgotPasswordFormProps): ReactElement => {
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

  switch (currentStep) {
    case "sendCodeConfirmation":
      return <ForgotPassword.Form.SendCodeConfirmation onSubmit={generateCode} />
    case "codeConfirmation":
      return (
        <ForgotPassword.Form.CodeConfirmation
          email={email}
          onSubmit={isMatchCode}
          onResendCode={resendCode}
        />
      )
    case "resetPassword":
      return <ForgotPassword.Form.ResetPassword email={email} onSubmit={onSubmit} />
    default:
      return <></>
  }
}
