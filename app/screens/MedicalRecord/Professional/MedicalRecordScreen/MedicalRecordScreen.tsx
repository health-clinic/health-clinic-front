import { FC, ReactElement, useEffect, useState } from "react"
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Info,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react-native"
import { format } from "date-fns"
import { formatCNS, formatDocument, formatPhone } from "@/utils/formatters"
import { NavigationBar } from "@/screens/Common/NavigationBar"
import { Patient } from "@/models/Patient"
import { Appointment } from "@/models/Appointment"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { AppointmentResponse } from "@/services/appointment/appointment.api.types"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { showErrorToast } from "@/components/toast"
import { api } from "@/services/api"
import { toZonedDateString } from "@/utils/date/convert"

interface MedicalRecordScreenProps extends AppStackScreenProps<"MedicalRecord"> {}

export const MedicalRecordScreen: FC<MedicalRecordScreenProps> = ({
  navigation,
  route,
}: MedicalRecordScreenProps): ReactElement => {
  const { patient } = route.params as { patient: Patient }
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
      const response: any = await createAppointmentApi(api).findAll({
        patient_id: patient.id,
        status: "completed",
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

  useEffect(() => {
    fetchAppointments()
  }, [])

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="flex-1 text-neutral-800 text-lg font-semibold">Prontuário</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4">
          <View className="px-4 pt-2 gap-2">
            <View className="flex-row gap-4">
              <View className="w-20 h-20 rounded-full bg-neutral-300 items-center justify-center self-center">
                {patient.user.avatar ? (
                  <Image
                    source={{ uri: patient.user.avatar }}
                    className="w-20 h-20 rounded-full border border-neutral-400"
                  />
                ) : (
                  <UserIcon size={40} color={colors.neutral[500]} />
                )}
              </View>

              <View className="flex-1">
                <Text className="text-neutral-800 text-xl font-semibold">{patient.user.name}</Text>

                <View className="pt-2 gap-2">
                  <View className="flex-row items-center gap-2">
                    <Calendar size={16} color={colors.primary[500]} />

                    <Text className="text-neutral-600 text-sm">
                      {toZonedDateString(patient.user.birthdate!)}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Info size={16} color={colors.primary[500]} />

                    <Text className="text-neutral-600 text-sm">
                      CNS: {formatCNS(patient.cns) || "Não informado"}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <FileText size={16} color={colors.primary[500]} />

                    <Text className="text-neutral-600 text-sm">
                      CPF: {formatDocument(patient.user.document)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="h-px bg-neutral-300" />

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Phone size={16} color={colors.primary[500]} />

                <Text className="text-neutral-600 text-sm">{formatPhone(patient.user.phone)}</Text>
              </View>

              {patient.user.address && (
                <View className="flex-row items-center gap-2">
                  <MapPin size={16} color={colors.primary[500]} />

                  <Text className="text-neutral-600 text-sm">
                    {`${patient.user.address.street}, ${patient.user.address.number} - ${patient.user.address.district}, ${patient.user.address.city}/${patient.user.address.state}`}
                  </Text>
                </View>
              )}
            </View>

            {patient.tags.length > 0 && (
              <View className="flex-row flex-wrap gap-2 pt-2">
                {patient.tags.map((tag, index) => (
                  <View
                    key={index}
                    className="rounded-full px-2 py-0.5 bg-primary-500/10 border border-primary-500/30"
                  >
                    <Text className="text-xs text-neutral-800 font-medium">{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View className="h-px bg-neutral-300" />

          <View className="px-4 gap-4">
            <Text className="text-neutral-800 text-base font-semibold">Anotações</Text>

            {patient.note ? (
              <View className="bg-transparent border border-neutral-400 rounded-2xl overflow-hidden">
                <View className="p-4">
                  <View className="flex-row items-start gap-3">
                    <View className="w-8 h-8 rounded-full bg-primary-500/10 items-center justify-center">
                      <Info size={16} color={colors.primary[500]} />
                    </View>

                    <View className="flex-1">
                      <Text className="text-neutral-800 text-sm leading-relaxed">
                        {patient.note}
                      </Text>

                      <View className="flex-row items-center gap-2 pt-4">
                        <Calendar size={12} color={colors.neutral[600]} />

                        <Text className="text-neutral-600 text-xs">
                          Última atualização: {toZonedDateString(patient.updatedAt)} às{" "}
                          {format(patient.updatedAt, "HH:mm")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View className="gap-4 p-4 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center">
                  Nenhuma anotação registrada
                </Text>

                <Text className="text-neutral-600 text-sm text-center pt-1">
                  As anotações sobre o paciente aparecerão aqui quando houver registros.
                </Text>
              </View>
            )}
          </View>

          {appointments.length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-neutral-800 text-base font-semibold">
                  Histórico de consultas
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AppointmentList", {
                      type: "history",
                      appointments: appointments,
                    })
                  }
                >
                  <Text className="text-sm text-primary-600 font-medium">Ver todo histórico</Text>
                </TouchableOpacity>
              </View>

              {appointments.map((appointment: Appointment) => (
                <Pressable
                  className="border border-neutral-500 rounded-2xl overflow-hidden active:opacity-70"
                  key={appointment.id}
                  onPress={() =>
                    navigation.navigate("AppointmentDetails", {
                      appointment,
                    })
                  }
                >
                  <View className="h-0.5 bg-blue-500" />

                  <View className="p-3">
                    <View className="flex-row items-center gap-2">
                      <View className="w-8 h-8 rounded-full bg-neutral-300 items-center justify-center">
                        {appointment.professional.user?.avatar ? (
                          <Image
                            source={{ uri: appointment.professional.user.avatar }}
                            className="w-8 h-8 rounded-full border border-neutral-400"
                          />
                        ) : (
                          <UserIcon size={16} color="#8A8A8A" />
                        )}
                      </View>

                      <View className="flex-1">
                        <View className="flex-row items-center justify-between pr-8">
                          <Text className="text-white font-semibold text-sm">
                            {appointment.professional.user.name}
                          </Text>
                        </View>

                        <Text className="text-zinc-400 text-xs">
                          {appointment.professional.specialty}
                        </Text>

                        <View className="pt-1.5 flex-row items-center gap-3">
                          <View className="flex-row items-center gap-1.5">
                            <Calendar size={12} color={colors.primary[500]} />

                            <Text className="text-white text-xs">
                              {toZonedDateString(appointment.scheduledFor)}
                            </Text>
                          </View>

                          <View className="flex-row items-center gap-1.5">
                            <Clock size={12} color={colors.primary[500]} />

                            <Text className="text-white text-xs">
                              {format(appointment.scheduledFor, "HH:mm")}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="absolute right-2 top-0 bottom-0 justify-center">
                    <ChevronRight size={16} color="white" opacity={0.4} />
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="flex flex-col gap-4 px-4">
              <Text className="text-neutral-800 text-base font-semibold">
                Histórico de consultas
              </Text>

              <View className="gap-4 p-4 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center">
                  Nenhuma consulta registrada
                </Text>

                <Text className="text-neutral-600 text-sm text-center pt-1">
                  O histórico de consultas do paciente aparecerá aqui quando houver registros.
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
