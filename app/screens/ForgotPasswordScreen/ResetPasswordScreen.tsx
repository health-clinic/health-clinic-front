import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators"
import { FC, useState } from "react"
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAppTheme } from "../../utils/useAppTheme"
import { ActivityIndicator } from "react-native-paper"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"

interface ResetPasswordScreenProps
  extends NativeStackScreenProps<AppStackParamList, "ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = ({
  navigation,
  route,
}: ResetPasswordScreenProps) => {
  const { theme } = useAppTheme()
  const { email } = route.params

  const [focusedField, setFocusedField] = useState<"password" | "confirmPassword" | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(false)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const resetPassword = async (): Promise<void> => {
    if (!password && !confirmPassword) return

    setIsLoading(true)

    try {
      const { kind } = await createAuthenticationApi(api).resetUserPassword(email, password)
      if (kind !== "ok") {
        throw new Error(
          "Não foi possível validar o código internamente, por favor, solicite outro e revalide.",
        )
      }

      navigation.navigate("Login")
    } catch (error: any) {
      Alert.alert(
        "Ocorreu um problema ao validar o código: ",
        error.errors?.[0]?.message || "Por favor, entre em contato com o suporte.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-neutral-100 px-6 pt-20">
      <View className="flex-row items-center justify-center mb-10">
        <Image
          source={require("./../../../assets/images/logo.png")}
          style={{ width: 64, height: 64 }}
          resizeMode="contain"
        />

        <View className="ml-2">
          <Text className="text-3xl font-bold text-neutral-900">Postinho de Saúde</Text>
          <Text className="text-lg font-medium text-neutral-700">Cuidando da sua saúde</Text>
        </View>
      </View>

      <Text className="text-2xl font-bold text-neutral-900 mb-2">Redefinir senha</Text>

      <Text className="text-base text-neutral-700 mb-6">Insira sua nova senha abaixo.</Text>

      <View className="mb-4">
        <View
          className={`flex-row items-center bg-[rgba(80,90,110,0.95)] rounded-2xl border px-5 h-16 ${
            focusedField === "password" ? "border-primary-300" : "border-primary-500"
          }`}
        >
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color={theme.colors.palette.primary300}
            className="mr-2"
          />

          <TextInput
            className="flex-1 text-base text-neutral-900 font-body"
            placeholder="Senha"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={!isPasswordHidden}
            autoCapitalize="none"
          />

          <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)} className="p-2">
            <MaterialCommunityIcons
              name={isPasswordHidden ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={theme.colors.palette.primary300}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-4">
        <View
          className={`flex-row items-center bg-[rgba(80,90,110,0.95)] rounded-2xl border px-5 h-16 ${
            focusedField === "confirmPassword" ? "border-primary-300" : "border-primary-500"
          }`}
        >
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color={theme.colors.palette.primary300}
            className="mr-2"
          />

          <TextInput
            className="flex-1 text-base text-neutral-900 font-body"
            placeholder="Confirme a senha"
            placeholderTextColor={theme.colors.palette.neutral600}
            value={confirmPassword}
            onChangeText={(text: string) => setConfirmPassword(text)}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={!isConfirmPasswordHidden}
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
            className="p-2"
          >
            <MaterialCommunityIcons
              name={isConfirmPasswordHidden ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={theme.colors.palette.primary300}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={resetPassword}
        disabled={isLoading}
        className="bg-primary-500 mt-6 mb-4 py-4 rounded-xl items-center"
      >
        {isLoading ? <ActivityIndicator color="white" size="small" /> : <></>}

        <Text className="text-neutral-900 font-bold text-base">Redefinir senha</Text>
      </TouchableOpacity>
    </View>
  )
}
