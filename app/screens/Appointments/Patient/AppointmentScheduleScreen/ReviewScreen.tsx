import { FC, ReactElement } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Calendar, CheckCircle, ChevronLeft, MapPin, User } from "lucide-react-native"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { StepIndicator } from "@/components/StepIndicator"
import { Unit } from "@/models/Unit"
import { Specialty } from "@/models/Specialty"
import { Professional } from "@/models/Professional"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

interface AppointmentData {
  unit: Unit
  specialty: Specialty
  professional: Professional
  scheduledFor: string
}

interface ReviewScreenProps {
  appointment: AppointmentData
  onConfirm: () => void
  onBack: () => void
}

export const ReviewScreen: FC<ReviewScreenProps> = ({
  appointment,
  onConfirm,
  onBack,
}: ReviewScreenProps): ReactElement => {
  const navigation = useNavigation()

  const colors = tailwind.theme.extend.colors

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home" as never)}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">Agendar consulta</Text>
      </View>

      <View className="flex-1 gap-6 p-4">
        <StepIndicator currentStep={5} totalSteps={5} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <CheckCircle size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Confirmação do agendamento</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Revise os dados da sua consulta antes de finalizar
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="gap-4">
            <View className="bg-gray-800/50 rounded-lg p-4">
              <View className="flex-row items-center gap-2">
                <MapPin size={20} color="#60a5fa" />

                <Text className="text-white font-medium">Unidade</Text>
              </View>

              <View className="gap-3 pt-4">
                <View>
                  <Text className="text-gray-400 text-xs">Nome</Text>

                  <Text className="text-white text-base">{appointment.unit.name}</Text>
                </View>

                <View>
                  <Text className="text-gray-400 text-xs">Endereço</Text>

                  <Text className="text-white text-base">
                    {appointment.unit.address.street}, {appointment.unit.address.number} -{" "}
                    {appointment.unit.address.district}
                  </Text>

                  <Text className="text-white text-base">
                    {appointment.unit.address.city}, {appointment.unit.address.state}
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-gray-800/50 rounded-lg p-4">
              <View className="flex-row items-center gap-2">
                <User size={20} color="#60a5fa" />

                <Text className="text-white font-medium">Médico</Text>
              </View>

              <View className="gap-3 pt-4">
                <View>
                  <Text className="text-gray-400 text-xs">Nome</Text>

                  <Text className="text-white text-base">{appointment.professional.user.name}</Text>
                </View>

                <View>
                  <Text className="text-gray-400 text-xs">Especialidade</Text>

                  <Text className="text-white text-base">{appointment.specialty.name}</Text>
                </View>
              </View>
            </View>

            <View className="bg-gray-800/50 rounded-lg p-4">
              <View className="flex-row items-center gap-2">
                <Calendar size={20} color="#60a5fa" />

                <Text className="text-white font-medium">Data e horário</Text>
              </View>

              <View className="gap-3 pt-4">
                <View>
                  <Text className="text-gray-400 text-xs">Data</Text>

                  <Text className="text-white text-base">
                    {format(appointment.scheduledFor, "EEEE, dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </Text>
                </View>

                <View>
                  <Text className="text-gray-400 text-xs">Horário</Text>

                  <Text className="text-white text-base">
                    {format(appointment.scheduledFor, "HH:mm")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 bg-transparent border border-primary-600 items-center py-4 rounded-xl"
          >
            <Text className="text-base font-bold text-primary-600">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onConfirm}
            className="flex-1 bg-primary-600 items-center py-4 rounded-xl"
          >
            <Text className="text-base font-bold text-neutral-900">Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
