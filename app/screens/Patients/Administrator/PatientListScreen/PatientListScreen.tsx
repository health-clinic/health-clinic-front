import { FC, ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { Calendar, ChevronLeft, ChevronRight, Mail, User, UserCheck } from "lucide-react-native"
import { createPatientApi } from "@/services/patient/patient.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { Patient } from "@/models/Patient"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { format } from "date-fns"
import { PatientResponse } from "@/services/patient/patient.api.types"

interface PatientListScreenProps extends AdministratorAppStackScreenProps<"Patients"> {}

export const PatientListScreen: FC<PatientListScreenProps> = ({
  navigation,
}: PatientListScreenProps): ReactElement => {
  const { addressStore, loadingStore, patientStore, userStore } = useStores()
  const colors = tailwind.theme.extend.colors

  const [patients, setPatients] = useState<Patient[]>([])

  const toPatients = (data: PatientResponse): Patient[] => {
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

      return patientStore.set(patient.id, {
        id: patient.id,
        user: patient.id,
        cns: "",
        lastVisit: null,
        note: "",
        tags: [],
        createdAt: new Date(patient.createdAt),
        updatedAt: new Date(patient.updatedAt),
      })
    })
  }

  const fetchPatients = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createPatientApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error || "Erro ao carregar pacientes")

        return
      }

      setPatients(toPatients(response.patients))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro ao carregar os pacientes")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-9 w-9 items-center justify-center"
          >
            <ChevronLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>

          <Text className="text-neutral-800 text-lg font-semibold">Pacientes</Text>
        </View>
      </View>

      {patients.length > 0 ? (
        <ScrollView
          className="p-4"
          contentContainerClassName="flex-col gap-2"
          showsVerticalScrollIndicator={false}
        >
          {patients.map((patient) => (
            <TouchableOpacity
              key={patient.id}
              onPress={() => {
                navigation.navigate("PatientDetails", { patient })
              }}
              className="flex-col justify-center bg-transparent border border-neutral-500 rounded-2xl shadow-lg p-4 overflow-hidden active:bg-neutral-200/60 active:scale-95"
              accessibilityRole="button"
              accessibilityLabel={`Ver detalhes do paciente ${patient.user.name}`}
            >
              <View className="flex-row items-center">
                <View className="flex-1 gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-neutral-800 text-base font-extrabold flex-1"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {patient.user.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Mail size={16} color={colors.primary[500]} />
                    <Text
                      className="text-neutral-600 text-sm"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {patient.user.email}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <UserCheck size={16} color={colors.primary[500]} />
                      <Text className="text-neutral-800 text-sm tracking-wide">
                        CNS: {patient.cns}
                      </Text>
                    </View>

                    {patient.lastVisit && (
                      <View className="flex-row items-center gap-2">
                        <Calendar size={14} color={colors.neutral[500]} />
                        <Text className="text-neutral-600 text-xs font-medium">
                          {format(patient.lastVisit, "dd/MM/yyyy")}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View className="items-center justify-center">
                  <ChevronRight size={20} color={colors.neutral[500]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <View className="items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-neutral-300 items-center justify-center">
              <User size={40} color={colors.neutral[600]} />
            </View>

            <View className="items-center gap-2">
              <Text className="text-neutral-800 text-lg font-semibold text-center">
                Nenhum paciente cadastrado
              </Text>

              <Text className="text-neutral-600 text-sm text-center leading-relaxed">
                Ainda não há pacientes cadastrados no sistema.{"\n"}
                Os pacientes aparecerão aqui quando se registrarem.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
