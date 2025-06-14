import { FC, ReactElement } from "react"
import { Text, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { useStores } from "@/models"
import { AuthHeader } from "@/components/AuthHeader"
import { Register } from "@/screens/Authentication"
import { Link } from "@/components/Link"
import { showErrorToast } from "@/components/toast"
import { RegisterPayload } from "@/screens/Authentication/RegisterScreen/RegisterForm"
import { AuthSession } from "@/services/authentication/authentication.api.types"
import { GeneralApiProblem } from "@/services/api/apiProblem"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = ({
  navigation,
}: RegisterScreenProps): ReactElement => {
  const { authenticationStore, loadingStore, userStore } = useStores()

  const register = async (formData: RegisterPayload): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response: AuthSession | GeneralApiProblem =
        await createAuthenticationApi(api).register(formData)
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      const { token, user } = response

      authenticationStore.setAuthToken(token)
      userStore.assign(user)

      navigation.navigate("Home")
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  return (
    <View className="flex-1 justify-between p-6">
      <View className="flex-1 justify-center">
        <AuthHeader />

        <Register.Form.Root onSubmit={register} />
      </View>

      <View className="flex-row justify-center items-center mb-4">
        <Text className="text-sm text-gray-400 text-center">Já tem uma conta? </Text>

        <Link
          accessibilityLabel="Voltar ao login"
          onPress={() => navigation.navigate("Login")}
          text="Entrar"
        />
      </View>
    </View>
  )
}
