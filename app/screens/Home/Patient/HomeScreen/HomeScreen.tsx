import { showErrorToast, showSuccessToast } from "@/components/toast"
import { useStores } from "@/models"
import { Appointment } from "@/models/Appointment"
import { AppStackScreenProps } from "@/navigators"
import { Action } from "@/screens/Common/Action"
import { HomeHeader } from "@/screens/Common/HomeHeader"
import { api } from "@/services/api"
import { GeneralApiProblem } from "@/services/api/apiProblem"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { AppointmentResponse } from "@/services/appointment/appointment.api.types"
import { Calendar, ChevronRight, Clock, Info, Pill, Plus, UserIcon } from "lucide-react-native"
import { format, isAfter, isBefore, isToday } from "date-fns"
import { FC, ReactElement, useEffect, useMemo, useState } from "react"
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native"
import { Swipeable } from "@/components/Swipeable"
import { Link } from "@/components/Link"
import { NavigationBar } from "@/screens/Common/NavigationBar"
import tailwind from "./../../../../../tailwind.config"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }: HomeScreenProps): ReactElement => {
  const {
    addressStore,
    appointmentStore,
    loadingStore,
    patientStore,
    professionalStore,
    unitStore,
    userStore,
  } = useStores()

  const colors = tailwind.theme.extend.colors

  const [appointments, setAppointments] = useState<Appointment[]>([])

  const toAppointments = (data: AppointmentResponse): Appointment[] => {
    return data.map((appointment) => {
      addressStore.set(appointment.patient.address.id, {
        id: appointment.patient.address.id,
        zipCode: appointment.patient.address.zipCode,
        state: appointment.patient.address.state,
        city: appointment.patient.address.city,
        district: appointment.patient.address.district,
        street: appointment.patient.address.street,
        number: Number(appointment.patient.address.number),
        createdAt: new Date(appointment.patient.address.createdAt),
        updatedAt: new Date(appointment.patient.address.updatedAt),
      })

      userStore.set(appointment.patient.id, {
        id: appointment.patient.id,
        address: appointment.patient.address.id,
        name: appointment.patient.name,
        email: appointment.patient.email,
        avatar: null,
        phone: appointment.patient.phone,
        birthdate: new Date(appointment.patient.birthdate),
        document: appointment.patient.document,
        role: appointment.patient.role,
        createdAt: new Date(appointment.patient.createdAt),
        updatedAt: new Date(appointment.patient.updatedAt),
      })

      patientStore.set(appointment.patient.id, {
        id: appointment.patient.id,
        user: appointment.patient.id,
        cns: "",
        lastVisit: null,
        note: "",
        tags: [],
        createdAt: new Date(appointment.patient.createdAt),
        updatedAt: new Date(appointment.patient.updatedAt),
      })

      userStore.set(appointment.professional.id, {
        id: appointment.professional.id,
        address: null,
        name: appointment.professional.name,
        email: appointment.professional.email,
        avatar: null,
        phone: "",
        birthdate: null,
        document: "",
        role: "professional",
        createdAt: new Date(appointment.professional.createdAt),
        updatedAt: new Date(appointment.professional.updatedAt),
      })

      professionalStore.set(appointment.professional.id, {
        id: appointment.professional.id,
        specialty: appointment.professional.specialty,
        unit: appointment.unit.id,
        user: appointment.professional.id,
        crm: "",
        createdAt: new Date(appointment.professional.createdAt),
        updatedAt: new Date(appointment.professional.updatedAt),
      })

      addressStore.set(appointment.unit.address.id, {
        id: appointment.unit.address.id,
        zipCode: appointment.unit.address.zipCode,
        state: appointment.unit.address.state,
        city: appointment.unit.address.city,
        district: appointment.unit.address.district,
        street: appointment.unit.address.street,
        number: Number(appointment.unit.address.number),
        createdAt: new Date(appointment.unit.address.createdAt),
        updatedAt: new Date(appointment.unit.address.updatedAt),
      })

      unitStore.set(appointment.unit.id, {
        id: appointment.unit.id,
        address: appointment.unit.address.id,
        name: appointment.unit.name,
        phone: appointment.unit.phone,
        distance: appointment.unit.distance || "",
        createdAt: new Date(appointment.unit.createdAt),
        updatedAt: new Date(appointment.unit.updatedAt),
      })

      return appointmentStore.set(appointment.id, {
        id: appointment.id,
        diagnoses: [],
        patient: appointment.patient.id,
        professional: appointment.professional.id,
        unit: appointment.unit.id,
        complaints: appointment.complaints,
        status: appointment.status,
        scheduledFor: new Date(appointment.scheduledFor),
        scheduledAt: new Date(appointment.scheduledAt),
        createdAt: new Date(appointment.createdAt),
        updatedAt: new Date(appointment.updatedAt),
      })
    })
  }

  const fetchAppointments: () => Promise<void> = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response: { kind: "ok"; appointments: Appointment[] } | GeneralApiProblem =
        await createAppointmentApi(api).findAll({ patient_id: userStore.user.id })
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      setAppointments(toAppointments(response.appointments))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

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

  const now = useMemo(() => new Date(), [])

  const pastAppointments = useMemo(
    () => appointments.filter((appointment) => isBefore(appointment.scheduledFor, now)),
    [appointments, now],
  )

  const upcomingAppointments = useMemo(
    () =>
      appointments.filter((appointment) => {
        console.log(appointment.scheduledFor)

        return isToday(appointment.scheduledFor) || isAfter(appointment.scheduledFor, now)
      }),
    [appointments, now],
  )

  const nextUpcomingAppointment = useMemo(
    () => (upcomingAppointments.length > 0 ? upcomingAppointments[0] : undefined),
    [upcomingAppointments],
  )

  useEffect((): void => {
    fetchAppointments()
  }, [])

  return (
    <View className="flex-1 gap-4 bg-neutral-100">
      <View className="bg-neutral-200 p-2 shadow-md">
        <HomeHeader />
      </View>

      <ScrollView contentContainerClassName="pb-32" showsVerticalScrollIndicator={false}>
        <View className="flex-1 flex-col gap-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="flex-row gap-4 pl-4 pr-16"
          >
            <Action
              icon={Plus}
              label="Nova consulta"
              highlight
              onPress={() => navigation.navigate("SelectUnit")}
            />
            <Action
              icon={Pill}
              label="Prescrições"
              onPress={() => navigation.navigate("PrescriptionList")}
            />
          </ScrollView>

          {nextUpcomingAppointment ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Próxima consulta</Text>
              </View>

              <Swipeable onSwipeComplete={() => cancelAppointment(nextUpcomingAppointment.id)}>
                {(animatedStyle) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("AppointmentDetails", {
                        appointment: nextUpcomingAppointment,
                      })
                    }
                  >
                    <Animated.View
                      className="border border-neutral-500 rounded-2xl overflow-hidden mb-3"
                      style={animatedStyle}
                    >
                      <View className="h-1 bg-blue-500" />

                      <View className="flex gap-2 p-4">
                        <View className="flex-row items-center">
                          <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                            {nextUpcomingAppointment.professional.user?.avatar ? (
                              <Image
                                source={{ uri: nextUpcomingAppointment.professional.user.avatar }}
                                className="w-12 h-12 rounded-full border border-neutral-400"
                              />
                            ) : (
                              <UserIcon size={24} color="#8A8A8A" />
                            )}
                          </View>

                          <View className="flex-1">
                            <Text className="text-white font-semibold text-base">
                              {nextUpcomingAppointment.professional.user.name}
                            </Text>

                            <Text className="text-zinc-400 text-sm">
                              {nextUpcomingAppointment.professional.specialty}
                            </Text>

                            <View className="mt-3 flex-row items-center">
                              <View className="flex-row items-center mr-3">
                                <Calendar size={16} color={colors.primary[500]} />

                                <Text className="text-white text-sm ml-2">
                                  {format(nextUpcomingAppointment.scheduledFor, "dd/MM/yyyy")}
                                </Text>
                              </View>

                              <View className="flex-row items-center">
                                <Clock size={16} color={colors.primary[500]} />

                                <Text className="text-white text-sm ml-2">
                                  {format(nextUpcomingAppointment.scheduledFor, "hh:mm")}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View className="justify-center ml-2">
                            <ChevronRight size={20} color="white" opacity={0.4} />
                          </View>
                        </View>

                        <View className="bg-primary-500/10 border border-primary-500/30 p-3 rounded-lg mt-2 flex-row items-center">
                          <View className="bg-blue-500 p-1.5 rounded-full mr-3 self-center">
                            <Info size={18} color={colors.neutral[900]} />
                          </View>

                          <Text className="text-neutral-900 text-xs flex-1">
                            Lembre-se de levar seu documento de identidade e chegar 15 minutos
                            antes.
                          </Text>
                        </View>
                      </View>
                    </Animated.View>
                  </Pressable>
                )}
              </Swipeable>
            </View>
          ) : (
            <View className="flex flex-col gap-4 px-4">
              <Text className="text-white font-semibold text-base">Próxima consulta</Text>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-white font-medium text-base text-center">
                  Primeiro passo da sua jornada
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Invista em prevenção. Agende sua consulta e mantenha sua saúde em dia.
                </Text>
              </View>
            </View>
          )}

          {upcomingAppointments.slice(1).length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Consultas futuras</Text>

                <Link
                  text="Ver próximas consultas"
                  onPress={() =>
                    navigation.navigate("AppointmentList", {
                      type: "upcoming",
                      appointments: upcomingAppointments,
                    })
                  }
                />
              </View>

              {upcomingAppointments.slice(1).map((appointment: Appointment) => (
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
                                    {format(appointment.scheduledFor, "dd/MM/yyyy")}
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
              ))}
            </View>
          ) : (
            <View className="flex flex-col gap-4 px-4">
              <Text className="text-white font-semibold text-base">Consultas futuras</Text>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  {nextUpcomingAppointment ? (
                    <View className="w-1/4 h-full bg-primary-500" />
                  ) : (
                    <View className="w-0 h-full bg-primary-500" />
                  )}
                </View>

                <Text className="text-white font-medium text-base text-center">
                  Planejando seu cuidado contínuo
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Após agendar sua primeira consulta, você poderá visualizar consultas futuras
                  programadas aqui.
                </Text>
              </View>
            </View>
          )}

          {pastAppointments.length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Histórico de consultas</Text>

                <Link
                  text="Ver todo histórico"
                  onPress={() =>
                    navigation.navigate("AppointmentList", {
                      type: "history",
                      appointments: pastAppointments,
                    })
                  }
                />
              </View>

              {pastAppointments.map((appointment: Appointment) => (
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
                              {format(appointment.scheduledFor, "dd/MM/yyyy")}
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
              ))}
            </View>
          ) : (
            <View className="flex flex-col gap-4 px-4">
              <Text className="text-white font-semibold text-base">Histórico de consultas</Text>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-white font-medium text-base text-center">
                  Histórico em construção
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Após realizar sua primeira consulta, você poderá acompanhar todo seu histórico
                  médico nesta seção.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <NavigationBar />
    </View>
  )
}
