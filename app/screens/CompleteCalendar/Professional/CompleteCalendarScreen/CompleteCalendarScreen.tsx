import { FC, ReactElement, useEffect, useMemo, useState } from "react"
import type { GestureResponderEvent } from "react-native"
import { Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { ChevronLeft, ChevronRight, Clock, User as UserIcon } from "lucide-react-native"
import { addDays, format, parse, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { NavigationBar } from "@/screens/Common/NavigationBar"
import { Appointment } from "@/models/Appointment"
import { AppointmentResponse } from "@/services/appointment/appointment.api.types"
import { Tabs } from "@/components/Tabs"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
}
LocaleConfig.defaultLocale = "pt-br"

interface CompleteCalendarScreenProps extends AppStackScreenProps<"CompleteCalendar"> {}

type FilterStatus = "all" | "scheduled" | "completed"

export const CompleteCalendarScreen: FC<CompleteCalendarScreenProps> = ({
  navigation,
}: CompleteCalendarScreenProps): ReactElement => {
  const {
    appointmentStore,
    userStore,
    addressStore,
    unitStore,
    professionalStore,
    patientStore,
    loadingStore,
  } = useStores()

  const colors = tailwind.theme.extend.colors

  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false)

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

  const fetchAppointments = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response: any = await createAppointmentApi(api).findAll({
        professional_id: userStore.user?.id,
        date_from: selectedDate,
        date_to: selectedDate,
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

  const filteredAppointments = useMemo(() => {
    if (filterStatus === "all") return appointments

    return appointments.filter((appointment) => appointment.status === filterStatus)
  }, [appointments, filterStatus])

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate])

  const handlePreviousDay = () => {
    const date = parse(selectedDate, "yyyy-MM-dd", new Date())
    setSelectedDate(format(subDays(date, 1), "yyyy-MM-dd"))
  }

  const handleNextDay = () => {
    const date = parse(selectedDate, "yyyy-MM-dd", new Date())
    setSelectedDate(format(addDays(date, 1), "yyyy-MM-dd"))
  }

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString)
    setIsCalendarVisible(false)
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold flex-1">Agenda</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4">
          <View className="px-4 pt-2">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={handlePreviousDay}
                className="h-9 w-9 items-center justify-center"
              >
                <ChevronLeft size={24} color={colors.neutral[800]} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsCalendarVisible(true)}
                className="flex-row items-center gap-2"
              >
                <Text className="text-neutral-800 text-lg font-medium">
                  {format(parse(selectedDate, "yyyy-MM-dd", new Date()), "EEEE, dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNextDay}
                className="h-9 w-9 items-center justify-center"
              >
                <ChevronRight size={24} color={colors.neutral[800]} />
              </TouchableOpacity>
            </View>
          </View>

          <Tabs.Root>
            <Tabs.Item
              label="Todas"
              isSelected={filterStatus === "all"}
              badgeCount={appointments.length}
              onPress={() => setFilterStatus("all")}
            />

            <Tabs.Item
              label="Agendadas"
              isSelected={filterStatus === "scheduled"}
              badgeCount={
                appointments.filter((appointment) => appointment.status === "scheduled").length
              }
              onPress={() => setFilterStatus("scheduled")}
            />

            <Tabs.Item
              label="Realizadas"
              isSelected={filterStatus === "completed"}
              badgeCount={
                appointments.filter((appointment) => appointment.status === "completed").length
              }
              onPress={() => setFilterStatus("completed")}
            />
          </Tabs.Root>

          <View className="px-4">
            {filteredAppointments.length > 0 ? (
              <View className="flex-col gap-4">
                {filteredAppointments.map((appointment) => (
                  <Pressable
                    key={appointment.id}
                    className="border border-neutral-500 rounded-2xl overflow-hidden active:opacity-70"
                    onPress={() =>
                      navigation.navigate("Appointment", {
                        appointment,
                      })
                    }
                  >
                    <View className="p-4">
                      <View className="flex-row items-center gap-3">
                        <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center">
                          {appointment.patient.user.avatar ? (
                            <Image
                              source={{ uri: appointment.patient.user.avatar }}
                              className="w-12 h-12 rounded-full border border-neutral-400"
                            />
                          ) : (
                            <UserIcon size={24} color={colors.neutral[500]} />
                          )}
                        </View>

                        <View className="flex-1">
                          <View className="flex-row items-center justify-between pr-8">
                            <Text className="text-neutral-800 font-semibold text-base">
                              {appointment.patient.user.name}
                            </Text>

                            <View
                              className={`px-3 py-1 rounded-full border ${
                                appointment.status === "scheduled"
                                  ? "bg-blue-500/20 border-blue-500/30"
                                  : appointment.status === "completed"
                                    ? "bg-green-500/20 border-green-500/30"
                                    : "bg-neutral-500/20 border-neutral-500/30"
                              }`}
                            >
                              <Text
                                className={`text-xs font-medium ${
                                  appointment.status === "scheduled"
                                    ? "text-blue-500"
                                    : appointment.status === "completed"
                                      ? "text-green-500"
                                      : "text-neutral-500"
                                }`}
                              >
                                {appointment.status === "scheduled"
                                  ? "Agendada"
                                  : appointment.status === "completed"
                                    ? "Concluída"
                                    : ""}
                              </Text>
                            </View>
                          </View>

                          <View className="flex-row items-center gap-2 pt-2">
                            <Clock size={16} color={colors.primary[500]} />
                            <Text className="text-neutral-600 text-sm">
                              {format(appointment.scheduledFor, "HH:mm")}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View className="absolute right-2 top-0 bottom-0 justify-center">
                      <ChevronLeft size={16} color={colors.neutral[800]} opacity={0.4} />
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              <View className="gap-4 p-4 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center">
                  Nenhuma consulta{" "}
                  {filterStatus === "all"
                    ? "agendada"
                    : filterStatus === "scheduled"
                      ? "pendente"
                      : filterStatus === "completed"
                        ? "concluída"
                        : ""}
                </Text>

                <Text className="text-neutral-600 text-sm text-center">
                  Você não possui consultas{" "}
                  {filterStatus === "all"
                    ? "agendadas"
                    : filterStatus === "scheduled"
                      ? "pendentes"
                      : filterStatus === "completed"
                        ? "concluídas"
                        : ""}{" "}
                  para esta data.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <NavigationBar />

      <Modal
        visible={isCalendarVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center"
          onPress={() => setIsCalendarVisible(false)}
        >
          <Pressable onPress={(e: GestureResponderEvent) => e.stopPropagation()}>
            <View className="mx-4 bg-neutral-100 rounded-2xl overflow-hidden">
              <Calendar
                current={selectedDate}
                onDayPress={handleDateSelect}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: colors.primary[500],
                  },
                }}
                theme={{
                  backgroundColor: colors.neutral[100],
                  calendarBackground: colors.neutral[100],
                  textSectionTitleColor: colors.neutral[600],
                  selectedDayBackgroundColor: colors.primary[500],
                  selectedDayTextColor: colors.neutral[900],
                  todayTextColor: colors.primary[500],
                  dayTextColor: colors.neutral[800],
                  textDisabledColor: colors.neutral[400],
                  dotColor: colors.primary[500],
                  selectedDotColor: colors.neutral[900],
                  arrowColor: colors.primary[500],
                  monthTextColor: colors.neutral[800],
                  indicatorColor: colors.primary[500],
                  textDayFontWeight: "600",
                  textMonthFontSize: 16,
                  textMonthFontWeight: "bold",
                  textDayHeaderFontSize: 14,
                  textDayFontSize: 14,
                }}
                enableSwipeMonths
                firstDay={0}
                renderHeader={(date: Date) => {
                  const year = date.getFullYear()
                  const month = date.getMonth()
                  const months = [
                    "janeiro",
                    "fevereiro",
                    "março",
                    "abril",
                    "maio",
                    "junho",
                    "julho",
                    "agosto",
                    "setembro",
                    "outubro",
                    "novembro",
                    "dezembro",
                  ]

                  return (
                    <Text className="text-neutral-800 font-bold text-base">
                      {`${months[month]} de ${year}`}
                    </Text>
                  )
                }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}
