import { FC, ReactElement, useEffect } from "react"
import { Alert, View } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "@/navigators"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { useStores } from "@/models"
import { AuthHeader } from "@/components/AuthHeader"
import { Login } from "@/screens/Authentication"
import { Link } from "@/components/Link"
import { showErrorToast } from "@/components/toast"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(
  ({ navigation }: LoginScreenProps): ReactElement => {
    const { authenticationStore, loadingStore, userStore } = useStores()

    const login = async (email: string, password: string): Promise<void> => {
      loadingStore.setLoading(true)

      try {
        const response = await createAuthenticationApi(api).login(email, password)
        if (response.kind !== "ok") {
          showErrorToast(response.data?.error)

          return
        }

        const { token, user } = response

        authenticationStore.setAuthToken(token)
        userStore.assign(user)
      } catch (error: any) {
        console.error(error)

        showErrorToast(`Não foi possível realizar o login: ${error?.message}`)
      } finally {
        loadingStore.setLoading(false)
      }
    }

    // const biometricLogin = async (): Promise<void> => {
    //   const success = await authenticateWithBiometrics()
    //   if (!success) {
    //     Alert.alert(
    //       "Falha na autenticação biométrica",
    //       "Não foi possível verificar sua identidade. Tente novamente ou entre com e-mail e senha.",
    //     )
    //
    //     return
    //   }
    //
    //   navigation.navigate("Home")
    // }

    return (
      <View className="flex-1 justify-center gap-6 p-6">
        <AuthHeader />

        <Login.Form onSubmit={login} />

        <View className="flex-row justify-between items-center">
          <Link
            onPress={(): any => navigation.navigate("ForgotPassword")}
            text="Esqueceu a senha?"
          />

          <Link onPress={(): any => navigation.navigate("Register")} text="Cadastre-se" />
        </View>

        {/*<Login.BiometricButton onPress={biometricLogin} />*/}
      </View>
    )
  },
)
