import { ForgotPasswordForm } from "@/screens/Auth/ForgotPasswordScreen/ForgotPasswordForm"
import { ForgotPasswordScreen } from "@/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen"
import { SendConfirmCodeForm } from "@/screens/Auth/ForgotPasswordScreen/SendConfirmCodeForm"
import { CodeConfirmationForm } from "@/screens/Auth/ForgotPasswordScreen/CodeConfirmationForm"
import { ResetPasswordForm } from "@/screens/Auth/ForgotPasswordScreen/ResetPasswordForm"

export const ForgotPassword = {
  Form: {
    Root: ForgotPasswordForm,
    SendCodeConfirmation: SendConfirmCodeForm,
    CodeConfirmation: CodeConfirmationForm,
    ResetPassword: ResetPasswordForm,
  },
  Screen: ForgotPasswordScreen,
}
