import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { Alert, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { AuthHeader } from "@/components/AuthHeader"
import { Login } from "."
import { Link } from "@/components/Link"
import { authenticateWithBiometrics } from "@/utils/useBiometricAuth"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({
  navigation,
}: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string): Promise<void> => {
    if (!email || !password) return

    setIsLoading(true)

    const { kind } = await createAuthenticationApi(api).login(email, password)
    if (kind !== "ok") {
      setIsLoading(false)
      Alert.alert("Não foi possível entrar", "Verifique se seu e-mail e senha estão corretos.")

      return
    }

    setIsLoading(false)

    navigation.navigate("Home")
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

      <Login.Form isLoading={isLoading} onSubmit={login} />

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
