import { FC, ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { ChevronLeft, ChevronRight, Mail, Stethoscope, User, UserPlus } from "lucide-react-native"
import { createProfessionalApi } from "@/services/professional/professional.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { Professional } from "@/models/Professional"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { ProfessionalResponse } from "@/services/professional/professional.api.types"

interface ProfessionalListScreenProps
  extends AdministratorAppStackScreenProps<"ProfessionalList"> {}

export const ProfessionalListScreen: FC<ProfessionalListScreenProps> = ({
  navigation,
}: ProfessionalListScreenProps): ReactElement => {
  const {
    addressStore,
    loadingStore,
    professionalStore,
    professionalScheduleStore,
    unitStore,
    userStore,
  } = useStores()
  const colors = tailwind.theme.extend.colors

  const [professionals, setProfessionals] = useState<Professional[]>([])

  const toProfessional = (data: ProfessionalResponse): Professional[] => {
    return data.map((professional) => {
      userStore.set(professional.id, {
        id: professional.id,
        address: null,
        name: professional.name,
        email: professional.email,
        avatar: null,
        phone: null,
        birthdate: null,
        document: null,
        role: "professional",
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })

      const scheduleIds: number[] = []
      const unitIds: number[] = []

      professional.schedules?.forEach((schedule: any) => {
        professionalScheduleStore.set(schedule.id, {
          id: schedule.id,
          professionalId: professional.id,
          unitId: schedule.unitId,
          dayOfWeek: schedule.dayOfWeek,
          start: schedule.start,
          end: schedule.end,
          createdAt: new Date(schedule.createdAt),
          updatedAt: new Date(schedule.updatedAt),
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
              createdAt: new Date(schedule.unit.address.createdAt),
              updatedAt: new Date(schedule.unit.address.updatedAt),
            })
          }

          unitStore.set(schedule.unit.id, {
            id: schedule.unit.id,
            address: schedule.unit.address?.id,
            name: schedule.unit.name,
            phone: schedule.unit.phone,
            schedules: [],
            professionalSchedules: [],
            createdAt: new Date(schedule.unit.createdAt),
            updatedAt: new Date(schedule.unit.updatedAt),
          })
        }
      })

      return professionalStore.set(professional.id, {
        id: professional.id,
        specialty: professional.specialty,
        unit: null,
        user: professional.id,
        crm: professional.crm || "CRM-" + professional.id,
        schedules: scheduleIds,
        units: unitIds,
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })
    })
  }

  const fetchProfessionals = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createProfessionalApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error || "Erro ao carregar profissionais")
        return
      }

      setProfessionals(toProfessional(response.professionals))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro ao carregar os profissionais")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessionals()
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

          <Text className="text-neutral-800 text-lg font-semibold">Profissionais</Text>
        </View>
      </View>

      {professionals.length > 0 ? (
        <ScrollView
          className="p-4"
          contentContainerClassName="flex-col gap-2"
          showsVerticalScrollIndicator={false}
        >
          {professionals.map((professional) => (
            <TouchableOpacity
              key={professional.id}
              onPress={() => {
                navigation.navigate("ProfessionalDetails", { professional })
              }}
              className="flex-col justify-center bg-transparent border border-neutral-500 rounded-2xl shadow-lg p-4 overflow-hidden active:bg-neutral-200/60 active:scale-95"
              accessibilityRole="button"
              accessibilityLabel={`Ver detalhes do profissional ${professional.user.name}`}
            >
              <View className="flex-row items-center">
                <View className="flex-1 gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-neutral-800 text-base font-extrabold flex-1"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {professional.user.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Stethoscope size={16} color={colors.primary[500]} />
                    <Text
                      className="text-neutral-600 text-sm"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {professional.specialty}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <Mail size={16} color={colors.primary[500]} />
                      <Text className="text-neutral-800 text-sm tracking-wide">
                        {professional.user.email}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-2">
                      <User size={14} color={colors.neutral[500]} />
                      <Text className="text-neutral-600 text-xs font-medium">
                        {professional.crm}
                      </Text>
                    </View>
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
              <UserPlus size={40} color={colors.neutral[600]} />
            </View>

            <View className="items-center gap-2">
              <Text className="text-neutral-800 text-lg font-semibold text-center">
                Nenhum profissional cadastrado
              </Text>

              <Text className="text-neutral-600 text-sm text-center leading-relaxed">
                Ainda não há profissionais cadastrados no sistema.{"\n"}
                Os profissionais aparecerão aqui quando se registrarem.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
