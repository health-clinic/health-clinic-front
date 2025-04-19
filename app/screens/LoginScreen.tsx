import { observer } from "mobx-react-lite"
import { FC, useRef, useState } from "react"
import { TextInput, View, TouchableOpacity, Alert, Text, Image } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { AppStackScreenProps } from "../navigators"
import { useAppTheme } from "../utils/useAppTheme"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { createAuthApi } from "@/services/api/authService.api"
import { api } from "@/services/api"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const passwordInput = useRef<TextInput>(null)
  const [isLogin, setIsLogin] = useState(true)

  // No animation for simplicity
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useAppTheme()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Input focus states
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)

  function login() {
    setIsSubmitted(true)

    if (email && password) {
      setIsLoading(true)

      createAuthApi(api)
        .login(email, password)
        .then(() => {
          setIsLoading(false)
          navigation.navigate("Home")
        })
        .catch((error) => {
          setIsLoading(false)

          const errorMessage = error.errors?.[0]?.message || "Erro ao fazer login"
          Alert.alert("Erro de autenticação", errorMessage)
        })
    }
  }

  // function handleBiometricLogin() {
  //   setIsLoading(true)

  //   setTimeout(() => {
  //     setIsLoading(false)
  //     navigation.navigate("Home")
  //   }, 1500)
  // }

  return (
    <View className="flex-1 justify-center bg-background px-6 py-6">
      <View className="flex-row items-center justify-center mb-10">
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 64, height: 64 }}
          resizeMode="contain"
        />

        <View className="ml-2">
          <Text className="text-3xl font-bold text-neutral-900">Postinho de Saúde</Text>
          <Text className="text-lg font-medium text-neutral-700">Cuidando da sua saúde</Text>
        </View>
      </View>

      <View className="mb-10">
        <View className="mb-4">
          <View className="flex-row items-center bg-[rgba(80,90,110,0.95)] border border-primary-500 rounded-xl px-4 py-3 h-14">
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color={theme.colors.palette.primary300}
              className="mr-2"
            />
            <TextInput
              className="flex-1 text-base text-neutral-900 font-interRegular"
              placeholder="E-mail"
              placeholderTextColor={theme.colors.palette.neutral600}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
              onSubmitEditing={() => passwordInput.current?.focus()}
            />
          </View>
        </View>

        <View className="mb-4">
          <View className="flex-row items-center bg-[rgba(80,90,110,0.95)] border border-primary-500 rounded-xl px-4 py-3 h-14">
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color={theme.colors.palette.primary300}
              className="mr-2"
            />
            <TextInput
              ref={passwordInput}
              className="flex-1 text-base text-neutral-900 font-interRegular"
              placeholder="Senha"
              placeholderTextColor={theme.colors.palette.neutral600}
              secureTextEntry={isPasswordHidden}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={login}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              className="p-2"
            >
              <MaterialCommunityIcons
                name={isPasswordHidden ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={theme.colors.palette.primary300}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className={`w-full items-center mb-4 py-4 rounded-xl ${isLoading ? "bg-primary-400" : "bg-primary-500"}`}
          onPress={login}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.palette.neutral900} size="small" />
          ) : (
            <Text className="text-base font-bold text-neutral-900">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            accessibilityLabel="Entrar"
            accessibilityRole="link"
          >
            <Text className="text-sm text-primary-300 font-medium">Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            accessibilityLabel="Entrar"
            accessibilityRole="link"
          >
            <Text className="text-sm text-primary-300 font-medium">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="items-center">
        <Text className="text-neutral-800 text-base mb-4 font-medium">Ou entre com</Text>

        <TouchableOpacity
          onPress={() => {}}
          className="w-18 h-18 rounded-full bg-white/5 items-center justify-center shadow-md"
          accessibilityLabel="Entrar com impressão digital"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons
            name="fingerprint"
            size={64}
            color={theme.colors.palette.primary500}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
})
