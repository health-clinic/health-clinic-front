import { ForgotPasswordForm } from "@/screens/Authentication/ForgotPasswordScreen/ForgotPasswordForm"
import { ForgotPasswordScreen } from "@/screens/Authentication/ForgotPasswordScreen/ForgotPasswordScreen"
import { SendConfirmCodeForm } from "@/screens/Authentication/ForgotPasswordScreen/SendConfirmCodeForm"
import { CodeConfirmationForm } from "@/screens/Authentication/ForgotPasswordScreen/CodeConfirmationForm"
import { ResetPasswordForm } from "@/screens/Authentication/ForgotPasswordScreen/ResetPasswordForm"

export const ForgotPassword = {
  Form: {
    Root: ForgotPasswordForm,
    SendCodeConfirmation: SendConfirmCodeForm,
    CodeConfirmation: CodeConfirmationForm,
    ResetPassword: ResetPasswordForm,
  },
  Screen: ForgotPasswordScreen,
}
