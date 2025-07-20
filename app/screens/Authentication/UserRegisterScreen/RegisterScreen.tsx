import { FC, ReactElement } from "react"
import { View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { createAuthenticationApi } from "@/services/authentication/authentication.api"
import { api } from "@/services/api"
import { useStores } from "@/models"
import { Register } from "@/screens/Authentication"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import { RegisterPayload } from "@/screens/Authentication/UserRegisterScreen/RegisterForm"
import { AuthSession } from "@/services/authentication/authentication.api.types"
import { GeneralApiProblem } from "@/services/api/apiProblem"
import { createUserApi, UpdateUserPayload } from "@/services/user"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = ({
  navigation,
  route,
}: RegisterScreenProps): ReactElement => {
  const { authenticationStore, loadingStore, userStore } = useStores()

  const { user } = route.params || {}
  const isEditMode = !!user

  const createOrUpdate = async (formData: RegisterPayload): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      if (isEditMode) {
        const updateData: UpdateUserPayload = {
          role: formData.role,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          document: formData.document,
          phone: formData.phone,
          birthdate: formData.birthdate,
          cns: formData.cns,
          address: formData.address,
          crm: formData.crm,
          specialty: formData.specialty,
        }

        const response = await createUserApi(api).update(user.id, updateData)
        if (response.kind !== "ok") {
          showErrorToast(response.data?.error || "Erro ao atualizar perfil")

          return
        }

        userStore.assign(response.user)

        showSuccessToast("Perfil atualizado com sucesso!")

        navigation.goBack()
      } else {
        const response: AuthSession | GeneralApiProblem =
          await createAuthenticationApi(api).register(formData)
        if (response.kind !== "ok") {
          showErrorToast(response.data?.error || "Erro ao criar conta")

          return
        }

        const { token, user } = response

        authenticationStore.setAuthToken(token)
        userStore.assign(user)
      }
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <Register.Form.Root onSubmit={createOrUpdate} onBack={handleBack} user={user} />

      {/* <View className="flex-row justify-center items-center mb-4">
        <Text className="text-sm text-gray-400 text-center">Já tem uma conta? </Text>
        <Link
          {...{ onPress: () => navigation.navigate("Login") }}
          text="Entrar"
        />
      </View> */}
    </View>
  )
}
