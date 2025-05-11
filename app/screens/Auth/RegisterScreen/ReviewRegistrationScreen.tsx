import { ReactElement } from "react"
import { Button } from "@/components/Button"
import { ScrollView, Text, View } from "react-native"
import { BriefcaseMedical, IdCard, MapPin, User } from "lucide-react-native"
import { RegisterPayload } from "@/screens/Auth/RegisterScreen/RegisterForm"

interface ReviewRegistrationScreenProps {
  formData: RegisterPayload
  onSubmit: (data: RegisterPayload) => void
  onBack: () => void
}

export const ReviewRegistrationScreen = ({
  formData,
  onSubmit,
  onBack,
}: ReviewRegistrationScreenProps): ReactElement => {
  const isPatient = formData.role === "patient"
  const isProfessional = formData.role === "professional"

  const renderField = (label: string, value?: string) => (
    <View className="mb-3">
      <Text className="text-gray-400 text-xs">{label}</Text>

      <Text className="text-white text-base">{value || "-"}</Text>
    </View>
  )

  return (
    <View className="flex-1 px-4 py-4">
      <Text className="text-lg font-medium text-white mb-4 text-center">
        Revise suas informações
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <User size={20} color="#60a5fa" />

            <Text className="text-white font-medium ml-2">Informações Gerais</Text>
          </View>

          {renderField("Nome", formData.name)}

          {renderField("E-mail", formData.email)}

          {renderField(
            "Tipo de Usuário",
            formData.role === "patient"
              ? "Paciente"
              : formData.role === "administrator"
                ? "Administrador"
                : "Profissional de Saúde",
          )}
        </View>

        {isPatient && (
          <>
            <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <IdCard size={20} color="#60a5fa" />

                <Text className="text-white font-medium ml-2">Dados Pessoais</Text>
              </View>

              {renderField("CPF", formData.document)}

              {renderField("Telefone", formData.phone)}

              {renderField("Data de Nascimento", formData.birthdate)}
            </View>

            {formData.address && (
              <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <View className="flex-row items-center mb-2">
                  <MapPin size={20} color="#60a5fa" />

                  <Text className="text-white font-medium ml-2">Endereço</Text>
                </View>

                {renderField("CEP", formData.address.zipCode)}

                {renderField("Rua", formData.address.street)}

                {renderField("Número", formData.address.number)}

                {renderField("Bairro", formData.address.district)}

                {renderField("Cidade", formData.address.city)}

                {renderField("Estado", formData.address.state)}
              </View>
            )}
          </>
        )}

        {isProfessional && (
          <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <BriefcaseMedical size={20} color="#60a5fa" />

              <Text className="text-white font-medium ml-2">Dados Profissionais</Text>
            </View>

            {renderField("CRM", formData.crm)}

            {renderField("Especialidade", formData.specialty)}
          </View>
        )}
      </ScrollView>

      <Text className="text-gray-400 text-sm text-center mt-4">
        Confirme se todos os dados estão corretos antes de finalizar o cadastro.
      </Text>

      <View className="flex-row gap-4 mt-4">
        <Button onPress={onBack} className="flex-1 bg-transparent border border-primary-600">
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </Button>

        <Button onPress={() => onSubmit(formData)} className="flex-1">
          <Text className="text-base font-bold text-neutral-900">Confimar</Text>
        </Button>
      </View>
    </View>
  )
}
