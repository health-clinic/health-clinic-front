import { FC, ReactElement, useState } from "react"
import { useStores } from "@/models"
import { showErrorToast } from "@/components/toast"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { ForgotPassword } from "@/screens"

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
      const { kind } = await createAuthenticationApi(api).sendForgotPasswordMail(email)
      if (kind !== "ok") {
        throw new Error("Erro ao enviar código de recuperação")
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
      const response = await createAuthenticationApi(api).isCodeMatch(code)
      if (response.kind !== "ok") {
        throw new Error(
          "Não foi possível validar o código internamente, por favor, solicite outro e revalide.",
        )
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
        throw new Error("Erro ao enviar código de recuperação")
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
      return <ForgotPassword.Form.CodeConfirmation email={email} onSubmit={isMatchCode} />
    case "resetPassword":
      return (
        <ForgotPassword.Form.ResetPassword
          email={email}
          onSubmit={onSubmit}
          onResendCode={resendCode}
        />
      )
    default:
      return <></>
  }
}
