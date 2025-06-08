import { AppStackScreenProps } from "@/navigators"
import { FC, ReactElement } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Calendar, ChevronLeft, Clock, Info, MapPin } from "lucide-react-native"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { api } from "@/services/api"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import { useStores } from "@/models"
import tailwind from "./../../../../../tailwind.config"
import { format } from "date-fns"
import { Appointment } from "@/models/Appointment"

interface AppointmentDetailsScreenProps extends AppStackScreenProps<"AppointmentDetails"> {}

export const AppointmentDetailsScreen: FC<AppointmentDetailsScreenProps> = ({
  navigation,
  route,
}: AppointmentDetailsScreenProps): ReactElement => {
  const { appointment } = route.params as { appointment: Appointment }
  const { loadingStore } = useStores()

  const colors = tailwind.theme.extend.colors

  const isUpcoming = new Date(appointment.scheduledFor) > new Date()

  const cancelAppointment = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAppointmentApi(api).cancel(appointment.id)
      if (response.kind !== "ok") {
        showErrorToast("Não foi possível cancelar a consulta. Tente novamente mais tarde.")
        return
      }

      showSuccessToast("Consulta cancelada com sucesso")
      navigation.goBack()
    } catch (error) {
      console.error("Error cancelling appointment:", error)
      showErrorToast("Ocorreu um erro ao cancelar a consulta")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const reschedule: () => void = (): void => {
    navigation.navigate("SelectDateTime", {
      appointmentId: appointment.id,
      professional: appointment.professional,
    })
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white font-semibold text-lg ml-4">Detalhes da Consulta</Text>
      </View>

      <ScrollView className="px-4" contentContainerClassName="pb-6">
        <View className="flex-1 border border-neutral-400 rounded-2xl overflow-hidden mb-6 mt-4">
          <View className="h-1 bg-blue-500" />

          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center justify-center">
                <Image
                  source={appointment.professional.user.avatar}
                  className="w-12 h-12 rounded-full border border-neutral-400 mr-3"
                />

                <View>
                  <Text className="text-neutral-900 font-semibold text-lg">
                    {appointment.professional.user.name}
                  </Text>

                  <Text className="text-neutral-700 text-base">
                    {appointment.professional.specialty}
                  </Text>
                </View>
              </View>

              <View className="mt-2 flex-row items-center">
                <View className="bg-primary-500 px-4 py-2 rounded-full">
                  <Text className="text-neutral-900 font-medium">
                    {appointment.status === "pending" && "Agendada"}
                    {appointment.status === "completed" && "Concluída"}
                    {appointment.status === "canceled" && "Cancelada"}
                  </Text>
                </View>
              </View>
            </View>

            <View className="border-y border-neutral-700 mt-4 pt-4">
              <View className="flex-row items-center gap-2 border border-neutral-400 rounded-2xl p-4 mb-3">
                <Calendar size={16} color="#60A5FA" className="mr-2" />

                <Text className="text-white text-sm">
                  <Text className="text-zinc-400">
                    {format(appointment.scheduledFor, "dd/MM/yyyy")}
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center gap-2 border border-neutral-400 rounded-2xl p-4 mb-3">
                <Clock size={16} color="#60A5FA" className="mr-2" />

                <Text className="text-white text-sm">
                  <Text className="text-zinc-400">{format(appointment.scheduledFor, "hh:mm")}</Text>
                </Text>
              </View>

              <View className="flex-row items-center gap-2 border border-neutral-400 rounded-2xl p-4 mb-3">
                <MapPin size={16} color="#60A5FA" className="mr-2" />

                <Text className="text-white text-sm">
                  <Text className="text-zinc-400">{appointment.professional.unit.name}</Text>
                </Text>
              </View>
            </View>

            {isUpcoming && (
              <View className="bg-primary-500/10 border border-primary-500/30 p-3 rounded-lg mt-4 flex-row items-center">
                <View className="bg-blue-500 p-1.5 rounded-full mr-3 self-center">
                  <Info size={18} color={colors.neutral[900]} />
                </View>
                <Text className="text-white text-xs flex-1">
                  Lembre-se de levar seu documento de identidade e chegar 15 minutos antes.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {isUpcoming && appointment.status === "pending" && (
        <View className="gap-2 px-4 pb-4">
          <TouchableOpacity className="bg-primary-500 p-4 rounded-xl" onPress={reschedule}>
            <Text className="text-white font-semibold text-center">Reagendar consulta</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-500 p-4 rounded-xl" onPress={cancelAppointment}>
            <Text className="text-white font-semibold text-center">Cancelar consulta</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
