import { FC, ReactElement, useState } from "react"
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Calendar, ChevronLeft, ChevronRight, Clock, User as UserIcon } from "lucide-react-native"
import { AppStackScreenProps } from "@/navigators"
import { Appointment } from "@/models/Appointment"
import { format } from "date-fns"
import Animated from "react-native-reanimated"
import { Swipeable } from "@/components/Swipeable"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { api } from "@/services/api"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import tailwind from "./../../../../../tailwind.config"
import { useStores } from "@/models"
import { toZonedDateString } from "@/utils/date/convert"

interface AppointmentListScreenProps extends AppStackScreenProps<"AppointmentList"> {}

export const AppointmentListScreen: FC<AppointmentListScreenProps> = ({
  navigation,
  route,
}: AppointmentListScreenProps): ReactElement => {
  const { type, appointments: initialAppointments } = route.params as {
    type: "upcoming" | "history"
    appointments: Appointment[]
  }

  const { loadingStore } = useStores()

  const colors = tailwind.theme.extend.colors

  const [appointments, setAppointments] = useState(initialAppointments)

  const cancelAppointment: (id: number) => Promise<void> = async (id: number): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAppointmentApi(api).cancel(id)
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      setAppointments((appointments: Appointment[]): Appointment[] =>
        appointments.filter((appointment: Appointment): boolean => appointment.id !== id),
      )

      showSuccessToast("Consulta cancelada com sucesso")
    } catch (error) {
      console.error("Error cancelling appointment:", error)

      showErrorToast("Ocorreu um erro ao cancelar a consulta")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="flex-row items-center gap-4 p-4 bg-neutral-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-semibold">
          {type === "upcoming" ? "Próximas consultas" : "Histórico de consultas"}
        </Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {appointments.map((appointment) =>
            type === "upcoming" ? (
              <Swipeable
                key={appointment.id}
                onSwipeComplete={() => cancelAppointment(appointment.id)}
              >
                {(animatedStyle) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("AppointmentDetails", {
                        appointment,
                      })
                    }
                  >
                    <Animated.View
                      className="border border-neutral-500 rounded-2xl overflow-hidden mb-3"
                      style={animatedStyle}
                    >
                      <View className="h-1 bg-blue-500" />

                      <View className="p-4">
                        <View className="flex-row items-center">
                          <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                            {appointment.professional.user?.avatar ? (
                              <Image
                                source={{ uri: appointment.professional.user.avatar }}
                                className="w-12 h-12 rounded-full border border-neutral-400"
                              />
                            ) : (
                              <UserIcon size={24} color="#8A8A8A" />
                            )}
                          </View>

                          <View className="flex-1">
                            <Text className="text-white font-semibold text-base">
                              {appointment.professional.user.name}
                            </Text>
                            <Text className="text-zinc-400 text-sm">
                              {appointment.professional.specialty}
                            </Text>

                            <View className="mt-3 flex-row items-center">
                              <View className="flex-row items-center mr-3">
                                <Calendar size={16} color={colors.primary[500]} />

                                <Text className="text-white text-sm ml-2">
                                  {toZonedDateString(appointment.scheduledFor)}
                                </Text>
                              </View>

                              <View className="flex-row items-center">
                                <Clock size={16} color={colors.primary[500]} />

                                <Text className="text-white text-sm ml-2">
                                  {format(appointment.scheduledFor, "hh:mm")}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View className="absolute right-2 top-0 bottom-0 justify-center">
                        <ChevronRight size={20} color="white" opacity={0.4} />
                      </View>
                    </Animated.View>
                  </Pressable>
                )}
              </Swipeable>
            ) : (
              <Pressable
                className="border border-neutral-500 rounded-2xl overflow-hidden mb-3 active:opacity-90"
                key={appointment.id}
                onPress={() =>
                  navigation.navigate("AppointmentDetails", {
                    appointment,
                  })
                }
              >
                <View className="h-1 bg-blue-500" />

                <View className="p-4">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                      {appointment.professional.user?.avatar ? (
                        <Image
                          source={{ uri: appointment.professional.user.avatar }}
                          className="w-12 h-12 rounded-full border border-neutral-400"
                        />
                      ) : (
                        <UserIcon size={24} color="#8A8A8A" />
                      )}
                    </View>

                    <View className="flex-1">
                      <Text className="text-white font-semibold text-base">
                        {appointment.professional.user.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm">
                        {appointment.professional.specialty}
                      </Text>

                      <View className="mt-3 flex-row items-center">
                        <View className="flex-row items-center mr-3">
                          <Calendar size={16} color={colors.primary[500]} />

                          <Text className="text-white text-sm ml-2">
                            {toZonedDateString(appointment.scheduledFor)}
                          </Text>
                        </View>

                        <View className="flex-row items-center">
                          <Clock size={16} color={colors.primary[500]} />

                          <Text className="text-white text-sm ml-2">
                            {format(appointment.scheduledFor, "hh:mm")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="absolute right-2 top-0 bottom-0 justify-center">
                  <ChevronRight size={20} color="white" opacity={0.4} />
                </View>
              </Pressable>
            ),
          )}
        </View>
      </ScrollView>
    </View>
  )
}
