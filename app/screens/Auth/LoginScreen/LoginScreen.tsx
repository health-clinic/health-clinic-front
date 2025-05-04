import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { authenticateWithBiometrics } from "@/utils/useBiometricAuth"
import { useStores } from "@/models"
import { AuthHeader } from "@/components/AuthHeader"
import { Login } from "@/screens"
import { Link } from "@/components/Link"
import { showErrorToast } from "@/components/toast"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({
  navigation,
}: LoginScreenProps) {
  const { loadingStore, userStore } = useStores()

  const login = async (email: string, password: string): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const { kind, user } = await createAuthenticationApi(api).login(email, password)
      if (kind !== "ok") {
        showErrorToast("Usuário ou senha inválidos. Verifique os dados e tente novamente.")
        return
      }

      userStore.assign(user)
      navigation.navigate("Home")
    } catch (error) {
      console.error(error)
      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const biometricLogin = async (): Promise<void> => {
    const success = await authenticateWithBiometrics()
    if (!success) {
      Alert.alert(
        "Falha na autenticação biométrica",
        "Não foi possível verificar sua identidade. Tente novamente ou entre com e-mail e senha.",
      )

      return
    }

    navigation.navigate("Home")
  }

  return (
    <View className="flex-1 justify-center gap-6 bg-background px-6 py-6">
      <AuthHeader />

      <Login.Form onSubmit={login} />

      <View className="flex-row justify-between items-center">
        <Link
          accessibilityLabel="Esqueceu a senha"
          onPress={(): any => navigation.navigate("ForgotPassword")}
          text="Esqueceu a senha?"
        />

        <Link
          accessibilityLabel="Cadastre-se"
          onPress={(): any => navigation.navigate("Register")}
          text="Cadastre-se"
        />
      </View>

      <Login.BiometricButton onPress={biometricLogin} />
    </View>
  )
})
