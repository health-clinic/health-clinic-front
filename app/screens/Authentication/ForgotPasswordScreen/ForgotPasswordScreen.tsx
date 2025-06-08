import { AppStackParamList } from "@/navigators"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View } from "react-native"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { AuthHeader } from "@/components/AuthHeader"
import { showErrorToast } from "@/components/toast"
import { useStores } from "@/models"
import { ForgotPassword } from "@/screens/Authentication"

interface ForgotPasswordScreenProps
  extends NativeStackScreenProps<AppStackParamList, "ForgotPassword"> {}

export const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { loadingStore } = useStores()

  const resetPassword = async (email: string, password: string): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAuthenticationApi(api).resetUserPassword(email, password)
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      navigation.navigate("Login")
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  return (
    <View className="flex-1 justify-center p-6">
      <AuthHeader />

      <ForgotPassword.Form.Root onSubmit={resetPassword} />
    </View>
  )
}
