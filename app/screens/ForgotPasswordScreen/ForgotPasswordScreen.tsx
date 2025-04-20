import { AppStackParamList } from "@/navigators"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC, useState } from "react"
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { ActivityIndicator } from "react-native-paper"

interface ForgotPasswordScreenProps
  extends NativeStackScreenProps<AppStackParamList, "ForgotPassword"> {}

export const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = (_props) => {
  const { navigation } = _props

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateCode = async () => {
    if (!email) return

    setIsLoading(true)

    try {
      const { kind } = await createAuthenticationApi(api).sendForgotPasswordMail(email)
      if (kind !== "ok") {
        throw new Error("Erro ao enviar código de recuperação")
      }

      navigation.navigate("CodeConfirmation", { email })
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

      <Text className="text-2xl font-bold text-neutral-900 mb-2">Esqueceu sua senha?</Text>

      <Text className="text-base text-neutral-700 mb-6">
        Digite seu e-mail cadastrado e enviaremos um código para redefinir sua senha.
      </Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#8A8A8A"
        className="w-full px-4 py-3 rounded-xl bg-neutral-300 text-neutral-900 mb-4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={generateCode}
        disabled={isLoading}
        className="bg-primary-500 py-4 rounded-xl items-center"
      >
        {isLoading ? <ActivityIndicator color="white" size="small" /> : <></>}

        <Text className="text-neutral-900 font-bold text-base">Enviar código</Text>
      </TouchableOpacity>
    </View>
  )
}
