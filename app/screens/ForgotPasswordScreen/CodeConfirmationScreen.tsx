import { AppStackParamList } from "@/navigators"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC, useState } from "react"
import { Alert, Image, Platform, Text, TouchableOpacity, View } from "react-native"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { ActivityIndicator } from "react-native-paper"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

const CELL_COUNT = 6

interface CodeConfirmationScreenProps
  extends NativeStackScreenProps<AppStackParamList, "CodeConfirmation"> {}

export const CodeConfirmationScreen: FC<CodeConfirmationScreenProps> = ({
  navigation,
  route,
}: CodeConfirmationScreenProps) => {
  const { email } = route.params

  const [code, setCode] = useState("")
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode })
  const [isLoading, setIsLoading] = useState(false)

  const isMatchCode = async () => {
    if (!code) return

    setIsLoading(true)

    try {
      const { kind, match } = await createAuthenticationApi(api).isCodeMatch(code)
      if (kind !== "ok") {
        throw new Error(
          "Não foi possível validar o código internamente, por favor, solicite outro e revalide.",
        )
      }

      if (!match) {
        throw new Error("Código preenchido está incorreto.")
      }

      navigation.navigate("ResetPassword", { email })
    } catch (error: any) {
      Alert.alert(
        "Ocorreu um problema ao validar o código: ",
        error.errors?.[0]?.message || "Por favor, entre em contato com o suporte.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const resendCode = async () => {
    if (!email) return

    setIsLoading(true)

    try {
      const { kind } = await createAuthenticationApi(api).sendForgotPasswordMail(email)
      if (kind !== "ok") {
        throw new Error("Erro ao enviar código de recuperação")
      }

      navigation.navigate("Login")
    } catch (error: any) {
      Alert.alert("Erro de autenticação", error.errors?.[0]?.message || "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-neutral-100 p-6">
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

      <Text className="text-2xl font-bold text-neutral-900 mb-2">
        Digite o código de verificação
      </Text>

      <Text className="text-base text-neutral-700 mb-6">
        Insira o código de 6 dígitos enviado para o seu e-mail
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: "sms-otp", default: "one-time-code" })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            className={`w-12 h-12 rounded-lg border-2 ${isFocused ? "border-primary-500 bg-neutral-200" : "border-neutral-500 bg-neutral-100"} text-center text-neutral-900 text-xl font-semibold leading-10 mx-1`}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

      <TouchableOpacity
        onPress={isMatchCode}
        disabled={isLoading}
        className="bg-primary-500 mt-6 mb-4 py-4 rounded-xl items-center"
      >
        {isLoading ? <ActivityIndicator color="white" size="small" /> : <></>}

        <Text className="text-neutral-900 font-bold text-base">Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={resendCode}
        disabled={isLoading}
        className="text-primary-500 py-4 rounded-xl items-center"
      >
        {isLoading ? <ActivityIndicator color="white" size="small" /> : <></>}

        <Text className="text-primary-500 font-bold text-base">Reenviar código</Text>
      </TouchableOpacity>
    </View>
  )
}
