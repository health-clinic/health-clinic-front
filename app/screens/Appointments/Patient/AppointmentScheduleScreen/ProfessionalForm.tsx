import { FC, ReactElement, useEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Check, ChevronLeft, User as UserIcon, UserCheck } from "lucide-react-native"
import { StepIndicator } from "@/components/StepIndicator"
import { Professional } from "@/models/Professional"
import { Unit } from "@/models/Unit"
import { Specialty } from "@/models/Specialty"
import { useStores } from "@/models"
import { createProfessionalApi } from "@/services/professional/professional.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { ProfessionalResponse } from "@/services/professional/professional.api.types"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { toZonedDate } from "@/utils/date/convert"

interface ProfessionalFormProps {
  unit: Unit
  specialty: Specialty
  onNext: (professional: Professional) => void
  onBack: () => void
}

export const ProfessionalForm: FC<ProfessionalFormProps> = ({
  unit,
  specialty,
  onNext,
  onBack,
}: ProfessionalFormProps): ReactElement => {
  const navigation = useNavigation()
  const {
    loadingStore,
    professionalStore,
    professionalScheduleStore,
    userStore,
    unitStore,
    addressStore,
  } = useStores()
  const colors = tailwind.theme.extend.colors

  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | undefined>()

  const toProfessionals = (data: ProfessionalResponse): Professional[] => {
    return data.map((professional) => {
      userStore.set(professional.id, {
        id: professional.id,
        address: null,
        name: professional.name,
        email: professional.email,
        avatar: null,
        phone: "",
        birthdate: null,
        document: "",
        role: "professional",
        createdAt: toZonedDate(professional.createdAt),
        updatedAt: toZonedDate(professional.updatedAt),
      })

      const scheduleIds: number[] = []
      const unitIds: number[] = []

      professional.schedules?.forEach((schedule: any) => {
        console.log(schedule)
        professionalScheduleStore.set(schedule.id, {
          id: schedule.id,
          professionalId: professional.id,
          unitId: schedule.unitId,
          dayOfWeek: schedule.dayOfWeek,
          start: schedule.start,
          end: schedule.end,
          createdAt: toZonedDate(schedule.createdAt),
          updatedAt: toZonedDate(schedule.updatedAt),
        })

        scheduleIds.push(schedule.id)

        if (schedule.unit && !unitIds.includes(schedule.unitId)) {
          unitIds.push(schedule.unitId)

          if (schedule.unit.address) {
            addressStore.set(schedule.unit.address.id, {
              id: schedule.unit.address.id,
              zipCode: schedule.unit.address.zipCode,
              state: schedule.unit.address.state,
              city: schedule.unit.address.city,
              district: schedule.unit.address.district,
              street: schedule.unit.address.street,
              number: Number(schedule.unit.address.number),
              createdAt: toZonedDate(schedule.unit.address.createdAt),
              updatedAt: toZonedDate(schedule.unit.address.updatedAt),
            })
          }

          unitStore.set(schedule.unit.id, {
            id: schedule.unit.id,
            address: schedule.unit.address?.id || null,
            name: schedule.unit.name,
            phone: schedule.unit.phone,
            schedules: [],
            professionalSchedules: [],
            createdAt: toZonedDate(schedule.unit.createdAt),
            updatedAt: toZonedDate(schedule.unit.updatedAt),
          })
        }
      })

      return professionalStore.set(professional.id, {
        id: professional.id,
        specialty: professional.specialty,
        unit: unit.id,
        user: professional.id,
        crm: professional.crm || "CRM-" + professional.id,
        schedules: scheduleIds,
        units: unitIds,
        createdAt: toZonedDate(professional.createdAt),
        updatedAt: toZonedDate(professional.updatedAt),
      })
    })
  }

  console.log(professionals.schedules)

  const fetchProfessionals = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createProfessionalApi(api).findAll({ specialty: specialty.name })
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)
        return
      }

      setProfessionals(toProfessionals(response.professionals))
    } catch (error) {
      console.error(error)
      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const next = () => {
    if (!selectedProfessional) {
      return
    }

    onNext(selectedProfessional)
  }

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
        <StepIndicator currentStep={3} totalSteps={5} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <UserCheck size={24} color={colors.primary[600]} />
            <Text className="text-neutral-800 text-lg font-bold">Escolha um médico</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Selecione o profissional de {specialty.name} em {unit.name}
          </Text>
        </View>

        <View className="flex-1 gap-4">
          {professionals.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              <View className="gap-4">
                {professionals.map((professional: Professional) => {
                  const isSelected = selectedProfessional?.id === professional.id

                  return (
                    <TouchableOpacity
                      key={professional.id}
                      onPress={() => setSelectedProfessional(professional)}
                      className={`border rounded-2xl overflow-hidden active:opacity-70 ${
                        isSelected ? "border-primary-500" : "border-neutral-500"
                      }`}
                    >
                      <View className="h-1 bg-blue-500" />

                      <View className="p-4">
                        <View className="flex-row items-center">
                          <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                            {professional.user?.avatar ? (
                              <Image
                                source={{ uri: professional.user.avatar }}
                                className="w-12 h-12 rounded-full border border-neutral-400"
                              />
                            ) : (
                              <UserIcon size={20} color={colors.neutral[500]} />
                            )}
                          </View>

                          <View className="flex-1">
                            <Text className="text-neutral-900 font-semibold text-base">
                              {professional.user.name}
                            </Text>

                            <Text className="text-neutral-600 text-sm">
                              {professional.specialty}
                            </Text>

                            <Text className="text-neutral-500 text-xs mt-1">
                              CRM: {professional.crm}
                            </Text>
                          </View>

                          {isSelected && (
                            <View className="justify-center ml-2">
                              <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                                <Check size={16} color="#000000" />
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="flex flex-col gap-4">
              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-white font-medium text-base text-center">
                  Nenhum médico encontrado
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Não há médicos disponíveis para a especialidade selecionada no momento.
                </Text>
              </View>
            </View>
          )}
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 bg-transparent border border-primary-600 items-center py-4 rounded-xl"
          >
            <Text className="text-base font-bold text-primary-600">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={next}
            disabled={!selectedProfessional}
            className={`flex-1 items-center py-4 rounded-xl ${
              selectedProfessional ? "bg-primary-600" : "bg-neutral-300"
            }`}
          >
            <Text
              className={`text-base font-bold ${
                selectedProfessional ? "text-neutral-900" : "text-neutral-500"
              }`}
            >
              Próximo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
