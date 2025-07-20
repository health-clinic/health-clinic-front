import { ReactElement } from "react"
import { Button } from "@/components/Button"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import {
  BriefcaseMedical,
  CheckCircle,
  ChevronLeft,
  IdCard,
  MapPin,
  User,
} from "lucide-react-native"
import { StepIndicator } from "@/components/StepIndicator"
import { RegisterPayload } from "@/screens/Authentication/UserRegisterScreen/RegisterForm"
import { useNavigation } from "@react-navigation/native"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"
import { toZonedDateString } from "@/utils/date/convert"

interface ReviewRegistrationScreenProps {
  formData: RegisterPayload
  onSubmit: (data: RegisterPayload) => void
  onBack: () => void
  isEditMode?: boolean
}

export const ReviewScreen = ({
  formData,
  onSubmit,
  onBack,
  isEditMode = false,
}: ReviewRegistrationScreenProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()
  const isPatient = formData.role === "patient"
  const isProfessional = formData.role === "professional"

  const role = formData.role
  const totalSteps =
    role === "administrator" ? 3 : role === "patient" ? 5 : role === "professional" ? 4 : 3
  const currentStep = totalSteps

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() =>
            isEditMode
              ? navigation.navigate("Profile" as never)
              : navigation.navigate("Login" as never)
          }
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">Criar conta</Text>
      </View>

      <View className="flex-1 gap-6 p-4">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} role={role} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <CheckCircle size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Revise suas informações</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Confirme se todos os dados estão corretos antes de finalizar o cadastro.
          </Text>
        </View>

        <View className="flex-1 gap-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-4">
              <View className="bg-gray-800/50 rounded-lg p-4">
                <View className="flex-row items-center gap-2">
                  <User size={20} color="#60a5fa" />

                  <Text className="text-white font-medium">Informações Gerais</Text>
                </View>

                <View className="gap-3 pt-4">
                  <View>
                    <Text className="text-gray-400 text-xs">Nome</Text>

                    <Text className="text-white text-base">{formData.name || "-"}</Text>
                  </View>

                  <View>
                    <Text className="text-gray-400 text-xs">E-mail</Text>

                    <Text className="text-white text-base">{formData.email || "-"}</Text>
                  </View>

                  <View>
                    <Text className="text-gray-400 text-xs">Tipo de Usuário</Text>

                    <Text className="text-white text-base">
                      {formData.role === "patient"
                        ? "Paciente"
                        : formData.role === "administrator"
                          ? "Administrador"
                          : "Profissional de Saúde"}
                    </Text>
                  </View>
                </View>
              </View>

              {isPatient && (
                <View className="bg-gray-800/50 rounded-lg p-4">
                  <View className="flex-row items-center gap-2">
                    <IdCard size={20} color="#60a5fa" />

                    <Text className="text-white font-medium">Dados Pessoais</Text>
                  </View>

                  <View className="gap-3 pt-4">
                    <View>
                      <Text className="text-gray-400 text-xs">CPF</Text>

                      <Text className="text-white text-base">{formData.document || "-"}</Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Telefone</Text>

                      <Text className="text-white text-base">{formData.phone || "-"}</Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Data de Nascimento</Text>

                      <Text className="text-white text-base">
                        {toZonedDateString(formData.birthdate as string)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {isPatient && formData.address && (
                <View className="bg-gray-800/50 rounded-lg p-4">
                  <View className="flex-row items-center gap-2">
                    <MapPin size={20} color="#60a5fa" />

                    <Text className="text-white font-medium">Endereço</Text>
                  </View>

                  <View className="gap-3 pt-4">
                    <View>
                      <Text className="text-gray-400 text-xs">CEP</Text>

                      <Text className="text-white text-base">
                        {formData.address.zipCode || "-"}
                      </Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Rua</Text>

                      <Text className="text-white text-base">{formData.address.street || "-"}</Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Número</Text>

                      <Text className="text-white text-base">{formData.address.number || "-"}</Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Bairro</Text>

                      <Text className="text-white text-base">
                        {formData.address.district || "-"}
                      </Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Cidade</Text>

                      <Text className="text-white text-base">{formData.address.city || "-"}</Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Estado</Text>

                      <Text className="text-white text-base">{formData.address.state || "-"}</Text>
                    </View>
                  </View>
                </View>
              )}

              {isProfessional && (
                <View className="bg-gray-800/50 rounded-lg p-4">
                  <View className="flex-row items-center gap-2">
                    <BriefcaseMedical size={20} color="#60a5fa" />

                    <Text className="text-white font-medium">Dados Profissionais</Text>
                  </View>

                  <View className="gap-3 pt-4">
                    <View>
                      <Text className="text-gray-400 text-xs">CRM</Text>

                      <Text className="text-white text-base">{formData.crm || "-"}</Text>
                    </View>

                    <View>
                      <Text className="text-gray-400 text-xs">Especialidade</Text>

                      <Text className="text-white text-base">{formData.specialty || "-"}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      <View className="flex-row gap-2 p-4">
        <Button onPress={onBack} className="flex-1 bg-transparent border border-primary-600">
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </Button>

        <Button onPress={() => onSubmit(formData)} className="flex-1">
          <Text className="text-base font-bold text-neutral-900">Confirmar</Text>
        </Button>
      </View>
    </View>
  )
}
