import { Image, Pressable, ScrollView, Text, View } from "react-native"
import { FC, ReactElement, useEffect, useMemo, useState } from "react"
import { useStores } from "@/models"
import { NavigationBar } from "@/screens/Common/NavigationBar"
import { AppStackScreenProps } from "@/navigators"
import { Appointment } from "@/models/Appointment"
import { Patient } from "@/models/Patient"
import { AppointmentResponse } from "@/services/appointment/appointment.api.types"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { createProfessionalApi } from "@/services/professional/professional.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { format, isAfter } from "date-fns"
import { Action } from "@/screens/Common/Action"
import { Calendar, CalendarDays, ChevronRight, Clock, Info, UserIcon } from "lucide-react-native"
import { HomeHeader } from "@/screens/Common/HomeHeader"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { RecentPatientsResponse } from "@/services/professional/professional.api.types"
import { formatCNS } from "@/utils/formatters"

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
  const [recentPatients, setRecentPatients] = useState<Patient[]>([])

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
      const response: any = await createAppointmentApi(api).findAll({
        professional_id: userStore.user?.id,
      })
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      const appointmentData = toAppointments(response.appointments)
      setAppointments(appointmentData)
    } catch (error) {
      console.error(error)
      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const toPatients = (data: RecentPatientsResponse): Patient[] => {
    return data.map((patient) => {
      addressStore.set(patient.address.id, {
        id: patient.address.id,
        zipCode: patient.address.zipCode,
        state: patient.address.state,
        city: patient.address.city,
        district: patient.address.district,
        street: patient.address.street,
        number: Number(patient.address.number),
        createdAt: new Date(patient.address.createdAt),
        updatedAt: new Date(patient.address.updatedAt),
      })

      userStore.set(patient.id, {
        id: patient.id,
        address: patient.address.id,
        name: patient.name,
        email: patient.email,
        avatar: null,
        phone: patient.phone,
        birthdate: new Date(patient.birthdate),
        document: patient.document,
        role: patient.role,
        createdAt: new Date(patient.createdAt),
        updatedAt: new Date(patient.updatedAt),
      })

      const existingPatient = patientStore.items.get(patient.id)
      if (existingPatient) {
        existingPatient.setProp("lastVisit", patient.lastVisit ? new Date(patient.lastVisit) : null)

        return existingPatient
      }

      return patientStore.set(patient.id, {
        id: patient.id,
        user: patient.id,
        cns: "",
        lastVisit: patient.lastVisit ? new Date(patient.lastVisit) : null,
        note: "",
        tags: [],
        createdAt: new Date(patient.createdAt),
        updatedAt: new Date(patient.updatedAt),
      })
    })
  }

  const fetchRecentPatients: () => Promise<void> = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createProfessionalApi(api).findRecentPatients(userStore.user?.id!)
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      setRecentPatients(toPatients(response.patients))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect((): void => {
    fetchAppointments()
    fetchRecentPatients()
  }, [])

  const now = useMemo(() => new Date(), [])

  const upcomingAppointments = useMemo(
    () => appointments.filter((appointment) => isAfter(appointment.scheduledFor, now)),
    [appointments, now],
  )

  const nextUpcomingAppointment = useMemo(
    () => (upcomingAppointments.length > 0 ? upcomingAppointments[0] : undefined),
    [upcomingAppointments],
  )

  return (
    <View className="flex-1 gap-4 bg-neutral-100">
      <View className="bg-neutral-200 p-2 shadow-md">
        <HomeHeader />
      </View>

      <ScrollView contentContainerClassName="pb-32" showsVerticalScrollIndicator={false}>
        <View className="flex flex-col gap-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 mt-4"
            contentContainerClassName="flex-row gap-2"
          >
            <Action
              icon={CalendarDays}
              label="Agenda completa"
              onPress={() => navigation.navigate("CompleteCalendar")}
            />
          </ScrollView>

          {nextUpcomingAppointment ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Próxima consulta</Text>
              </View>

              <Pressable
                onPress={() =>
                  navigation.navigate("AppointmentDetails", {
                    appointment: nextUpcomingAppointment,
                  })
                }
                className="active:opacity-70"
              >
                <View className="border border-neutral-500 rounded-2xl overflow-hidden">
                  <View className="flex gap-2 p-4">
                    <View className="flex-row items-center">
                      <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                        {nextUpcomingAppointment.patient.user?.avatar ? (
                          <Image
                            source={{ uri: nextUpcomingAppointment.patient.user.avatar }}
                            className="w-12 h-12 rounded-full border border-neutral-400"
                          />
                        ) : (
                          <UserIcon size={24} color={colors.neutral[500]} />
                        )}
                      </View>

                      <View className="flex-1">
                        <Text className="text-white font-semibold text-base">
                          {nextUpcomingAppointment.patient.user.name}
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
                              {format(nextUpcomingAppointment.scheduledFor, "HH:mm")}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className="justify-center ml-2">
                        <ChevronRight size={20} color={colors.neutral[900]} opacity={0.4} />
                      </View>
                    </View>

                    <View className="bg-primary-500/10 border border-primary-500/30 p-3 rounded-lg mt-2 flex-row items-center">
                      <View className="bg-blue-500 p-1.5 rounded-full mr-3 self-center">
                        <Info size={18} color={colors.neutral[900]} />
                      </View>

                      <Text className="text-neutral-900 text-xs flex-1">
                        Prepare-se para o atendimento. Revise o histórico do paciente antes da
                        consulta.
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          ) : (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Próxima consulta</Text>
              </View>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-white font-medium text-base text-center">
                  Nenhuma consulta agendada
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Aguarde novos agendamentos. Você será notificado quando houver consultas marcadas.
                </Text>
              </View>
            </View>
          )}

          {upcomingAppointments.length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Agenda de hoje</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex-row gap-4"
              >
                {upcomingAppointments.map(
                  (appointment: Appointment): ReactElement => (
                    <Pressable
                      key={appointment.id}
                      onPress={() =>
                        navigation.navigate("AppointmentDetails", {
                          appointment,
                        })
                      }
                      className="border border-neutral-500 rounded-2xl overflow-hidden w-72 active:opacity-70"
                    >
                      <View className="p-4">
                        <View className="flex-row items-center">
                          <View className="w-10 h-10 rounded-full bg-neutral-300 items-center justify-center mr-3">
                            {appointment.patient.user?.avatar ? (
                              <Image
                                source={{ uri: appointment.patient.user.avatar }}
                                className="w-10 h-10 rounded-full border border-neutral-400"
                              />
                            ) : (
                              <UserIcon size={20} color={colors.neutral[500]} />
                            )}
                          </View>

                          <View className="flex-1">
                            <Text className="text-white font-semibold text-base">
                              {appointment.patient.user.name}
                            </Text>

                            <View className="mt-2 flex-row items-center">
                              <Clock size={14} color={colors.primary[500]} />

                              <Text className="text-zinc-400 text-sm ml-2">
                                {format(appointment.scheduledFor, "HH:mm")}
                              </Text>
                            </View>
                          </View>

                          <View className="justify-center ml-2">
                            <ChevronRight size={20} color={colors.neutral[900]} opacity={0.4} />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  ),
                )}
              </ScrollView>
            </View>
          ) : (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Agenda de hoje</Text>
              </View>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-white font-medium text-base text-center">
                  Nenhuma consulta para hoje
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Você não tem consultas agendadas para hoje. Aproveite para revisar prontuários e
                  se preparar para os próximos atendimentos.
                </Text>
              </View>
            </View>
          )}

          {recentPatients.length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Pacientes recentes</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex-row gap-4"
              >
                {recentPatients.map((patient) => (
                  <View
                    key={patient.id}
                    className="flex flex-col justify-between w-64 rounded-2xl border border-neutral-500 bg-transparent p-4"
                  >
                    <View className="flex-row items-center gap-3">
                      {patient.user.avatar ? (
                        <Image
                          source={{ uri: patient.user.avatar }}
                          className="w-12 h-12 rounded-full border border-neutral-400"
                        />
                      ) : (
                        <View className="w-12 h-12 rounded-full bg-neutral-300 justify-center items-center">
                          <UserIcon size={24} color={colors.neutral[500]} />
                        </View>
                      )}

                      <View className="flex-1">
                        <Text className="text-white font-semibold text-base">
                          {patient.user.name}
                        </Text>

                        <Text className="text-zinc-400 text-xs">
                          {`Última consulta: ${patient.lastVisit ? format(patient.lastVisit, "dd/MM/yyyy") : "Não disponível"}`}
                        </Text>
                      </View>
                    </View>

                    {patient.note && (
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        className="text-zinc-400 text-xs mt-3"
                      >
                        {patient.note}
                      </Text>
                    )}

                    {patient.tags.length > 0 && (
                      <View className="flex-row flex-wrap gap-2 mt-3">
                        {patient.tags.map((tag, index) => (
                          <View
                            key={index}
                            className="rounded-full px-2 py-0.5 bg-primary-500/10 border border-primary-500/30"
                          >
                            <Text className="text-[10px] text-white font-medium">{tag}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    <View className="h-px bg-neutral-700 my-3" />

                    <Pressable
                      onPress={() => navigation.navigate("MedicalRecord", { patient })}
                      className="flex-row items-center rounded-lg p-2 active:bg-neutral-700/30"
                    >
                      <View className="flex-1">
                        <Text className="text-zinc-400 text-xs">Prontuário</Text>

                        <Text className="text-white text-sm font-medium">
                          #{formatCNS(patient.cns)}
                        </Text>
                      </View>

                      <ChevronRight size={20} color={colors.neutral[500]} />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base">Pacientes recentes</Text>
              </View>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-white font-medium text-base text-center">
                  Nenhum paciente recente
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Os pacientes que você atender aparecerão aqui para acesso rápido aos seus
                  registros.
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
