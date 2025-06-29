import { FC, ReactElement, useEffect, useMemo, useState } from "react"
import { ScrollView, View, Text, Pressable } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { PrescriptionHeader } from "@/components/PrescriptionHeader"
import { createPrescriptionApi } from "@/services/prescription/prescription.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { useStores } from "@/models"
import { Prescription } from "@/models/Prescription"
import { Prescription as PrescriptionAPI } from "@/services/prescription/prescription.api.types"
import { Tabs } from "@/components/Tabs"
import { isAfter, isWithinInterval, addDays, format } from "date-fns"
import { Pill, Calendar } from "lucide-react-native"
import { ptBR } from "date-fns/locale"

type PrescriptionListScreenProps = AppStackScreenProps<"PrescriptionList">

type AppointmentGroup = {
  appointment: Prescription["appointment"]
  prescriptions: Prescription[]
}

export const PrescriptionListScreen: FC<PrescriptionListScreenProps> = ({
  navigation,
}: PrescriptionListScreenProps): ReactElement => {
  const {
    loadingStore,
    addressStore,
    appointmentStore,
    patientStore,
    prescriptionStore,
    professionalStore,
    unitStore,
    userStore,
  } = useStores()

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [selectedTabId, setSelectedTabId] = useState<"active" | "expired">("active")

  const toPrescriptions = (data: PrescriptionAPI[]): Prescription[] => {
    console.log(data)
    return data.map((prescription) => {
      addressStore.set(prescription.appointment.patient.address.id, {
        id: prescription.appointment.patient.address.id,
        zipCode: prescription.appointment.patient.address.zipCode,
        state: prescription.appointment.patient.address.state,
        city: prescription.appointment.patient.address.city,
        district: prescription.appointment.patient.address.district,
        street: prescription.appointment.patient.address.street,
        number: Number(prescription.appointment.patient.address.number),
        createdAt: new Date(prescription.appointment.patient.address.createdAt),
        updatedAt: new Date(prescription.appointment.patient.address.updatedAt),
      })

      userStore.set(prescription.appointment.patient.id, {
        id: prescription.appointment.patient.id,
        address: prescription.appointment.patient.address.id,
        name: prescription.appointment.patient.name,
        email: prescription.appointment.patient.email,
        avatar: null,
        phone: prescription.appointment.patient.phone,
        birthdate: new Date(prescription.appointment.patient.birthdate),
        document: prescription.appointment.patient.document,
        role: prescription.appointment.patient.role,
        createdAt: new Date(prescription.appointment.patient.createdAt),
        updatedAt: new Date(prescription.appointment.patient.updatedAt),
      })

      patientStore.set(prescription.appointment.patient.id, {
        id: prescription.appointment.patient.id,
        user: prescription.appointment.patient.id,
        cns: "",
        lastVisit: null,
        note: "",
        tags: [],
        createdAt: new Date(prescription.appointment.patient.createdAt),
        updatedAt: new Date(prescription.appointment.patient.updatedAt),
      })

      userStore.set(prescription.appointment.professional.id, {
        id: prescription.appointment.professional.id,
        address: null,
        name: prescription.appointment.professional.name,
        email: prescription.appointment.professional.email,
        avatar: null,
        phone: "",
        birthdate: null,
        document: "",
        role: "professional",
        createdAt: new Date(prescription.appointment.professional.createdAt),
        updatedAt: new Date(prescription.appointment.professional.updatedAt),
      })

      professionalStore.set(prescription.appointment.professional.id, {
        id: prescription.appointment.professional.id,
        specialty: prescription.appointment.professional.specialty,
        unit: prescription.appointment.unit.id,
        user: prescription.appointment.professional.id,
        crm: "",
        createdAt: new Date(prescription.appointment.professional.createdAt),
        updatedAt: new Date(prescription.appointment.professional.updatedAt),
      })

      addressStore.set(prescription.appointment.unit.address.id, {
        id: prescription.appointment.unit.address.id,
        zipCode: prescription.appointment.unit.address.zipCode,
        state: prescription.appointment.unit.address.state,
        city: prescription.appointment.unit.address.city,
        district: prescription.appointment.unit.address.district,
        street: prescription.appointment.unit.address.street,
        number: Number(prescription.appointment.unit.address.number),
        createdAt: new Date(prescription.appointment.unit.address.createdAt),
        updatedAt: new Date(prescription.appointment.unit.address.updatedAt),
      })

      unitStore.set(prescription.appointment.unit.id, {
        id: prescription.appointment.unit.id,
        address: prescription.appointment.unit.address.id,
        name: prescription.appointment.unit.name,
        phone: prescription.appointment.unit.phone,
        createdAt: new Date(prescription.appointment.unit.createdAt),
        updatedAt: new Date(prescription.appointment.unit.updatedAt),
      })

      appointmentStore.set(prescription.appointment.id, {
        id: prescription.appointment.id,
        diagnoses: [],
        patient: prescription.appointment.patient.id,
        professional: prescription.appointment.professional.id,
        unit: prescription.appointment.unit.id,
        complaints: prescription.appointment.complaints,
        status: prescription.appointment.status,
        scheduledFor: new Date(prescription.appointment.scheduledFor),
        scheduledAt: new Date(prescription.appointment.scheduledAt),
        createdAt: new Date(prescription.appointment.createdAt),
        updatedAt: new Date(prescription.appointment.updatedAt),
      })

      return prescriptionStore.set(prescription.id, {
        id: prescription.id,
        name: prescription.name,
        dosage: prescription.dosage,
        frequency: prescription.frequency,
        duration: prescription.duration,
        appointment: prescription.appointment.id,
        createdAt: new Date(prescription.createdAt),
        updatedAt: new Date(prescription.updatedAt),
      })
    })
  }

  const fetchPrescriptions: () => Promise<void> = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createPrescriptionApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)
        return
      }

      const prescriptionData = response.prescriptions as unknown as PrescriptionAPI[]
      setPrescriptions(toPrescriptions(prescriptionData))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect((): void => {
    fetchPrescriptions()
  }, [])

  const now = useMemo(() => new Date(), [])

  const activePrescriptions = useMemo(() => {
    return prescriptions.filter((prescription: Prescription) => {
      const scheduledFor = prescription.appointment.scheduledFor

      const durationDays = parseInt(prescription.duration)
      const endDate = addDays(scheduledFor, durationDays)

      return isWithinInterval(now, { start: scheduledFor, end: endDate })
    })
  }, [prescriptions, now])

  const expiredPrescriptions = useMemo(() => {
    return prescriptions.filter((prescription: Prescription) => {
      const scheduledFor = prescription.appointment.scheduledFor

      const durationDays = parseInt(prescription.duration)
      const endDate = addDays(scheduledFor, durationDays)

      return isAfter(now, endDate)
    })
  }, [prescriptions, now])

  return (
    <View className="flex-1 bg-neutral-200">
      <PrescriptionHeader title="Prescrições" />

      <View className="px-6">
        <Tabs.Root>
          <Tabs.Item
            label="Ativas"
            isSelected={selectedTabId === "active"}
            onPress={() => setSelectedTabId("active")}
          />
          <Tabs.Item
            label="Expiradas"
            isSelected={selectedTabId === "expired"}
            onPress={() => setSelectedTabId("expired")}
          />
        </Tabs.Root>
      </View>

      <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
        <View className="flex flex-col gap-4">
          {Object.values(
            (selectedTabId === "active" ? activePrescriptions : expiredPrescriptions).reduce(
              (groups: Record<string, AppointmentGroup>, prescription) => {
                const appointmentId = prescription.appointment.id
                if (!groups[appointmentId]) {
                  groups[appointmentId] = {
                    appointment: prescription.appointment,
                    prescriptions: [],
                  }
                }
                groups[appointmentId].prescriptions.push(prescription)
                return groups
              },
              {},
            ),
          ).map((group: AppointmentGroup) => (
            <View
              key={group.appointment.id}
              className="bg-transparent border border-neutral-500 rounded-3xl overflow-hidden"
            >
              <View className="p-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Calendar size={20} color="#8A8A8A" />

                  <Text className="text-neutral-900 font-medium">
                    {format(group.appointment.scheduledFor, "dd MMM yyyy")}
                  </Text>
                </View>

                <Text className="text-neutral-600 font-medium">
                  {group.appointment.professional.user.name}
                </Text>
              </View>

              <View className="px-4 pb-4">
                <View className="flex flex-col gap-4">
                  {group.prescriptions.map((prescription: Prescription) => (
                    <Pressable
                      key={prescription.id}
                      className="bg-neutral-100 border border-neutral-500 rounded-2xl overflow-hidden active:opacity-70 p-4"
                      onPress={() => navigation.navigate("PrescriptionDetails", { prescription })}
                    >
                      <View key={prescription.id} className="flex-row">
                        <View className="w-8 flex items-start pt-1">
                          <Pill size={20} color="#8A8A8A" />
                        </View>

                        <View className="flex-col gap-1">
                          <Text className="text-neutral-900 text-lg font-medium">
                            {prescription.name}
                          </Text>

                          <Text className="text-neutral-600 text-base">
                            {prescription.dosage} • {prescription.frequency}
                          </Text>

                          <Text className="text-neutral-600 text-base">
                            Duração: {prescription.duration}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {(selectedTabId === "active" ? activePrescriptions : expiredPrescriptions).length === 0 && (
          <View className="p-6 border border-neutral-500 rounded-2xl">
            <View className="w-full h-0.5 bg-neutral-700 mb-4">
              <View className="w-0 h-full bg-primary-500" />
            </View>

            <Text className="text-white font-medium text-base text-center">
              {selectedTabId === "active" ? "Nenhuma prescrição ativa" : "Histórico de prescrições"}
            </Text>

            <Text className="text-zinc-400 text-center mt-2">
              {selectedTabId === "active"
                ? "Você não possui prescrições ativas no momento. Após uma consulta, suas prescrições aparecerão aqui."
                : "Após o vencimento de suas prescrições ativas, você poderá visualizar todo o histórico nesta seção."}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
