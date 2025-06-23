import { FC, ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { Building2, ChevronLeft, ChevronRight, Phone, Plus } from "lucide-react-native"
import { createUnitApi } from "@/services/unit/unit.api"
import { api } from "@/services/api"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import { Unit } from "@/models/Unit"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { formatPhone } from "@/utils/formatters"
import { UnitResponse } from "@/services/unit/unit.api.types"
import { Swipeable } from "@/components/Swipeable"
import Animated from "react-native-reanimated"

interface UnitListScreenProps extends AdministratorAppStackScreenProps<"UnitList"> {}

export const UnitListScreen: FC<UnitListScreenProps> = ({
  navigation,
}: UnitListScreenProps): ReactElement => {
  const { addressStore, loadingStore, professionalScheduleStore, unitStore, unitScheduleStore } =
    useStores()

  const colors = tailwind.theme.extend.colors

  const [units, setUnits] = useState<Unit[]>([])

  const toUnit = (data: UnitResponse): Unit[] => {
    return data.map((unit) => {
      addressStore.set(unit.address.id, {
        id: unit.address.id,
        zipCode: unit.address.zipCode,
        state: unit.address.state,
        city: unit.address.city,
        district: unit.address.district,
        street: unit.address.street,
        number: Number(unit.address.number),
        createdAt: new Date(unit.address.createdAt),
        updatedAt: new Date(unit.address.updatedAt),
      })

      unit.schedules?.forEach((schedule, index) => {
        unitScheduleStore.set(schedule.id || index, {
          id: schedule.id || index,
          unitId: unit.id,
          dayOfWeek: schedule.dayOfWeek,
          opening: schedule.opening,
          closing: schedule.closing,
          createdAt: new Date(schedule.createdAt),
          updatedAt: new Date(schedule.updatedAt),
        })
      })

      unit.professionalSchedules?.forEach((schedule) => {
        professionalScheduleStore.set(schedule.id, {
          id: schedule.id,
          professionalId: schedule.professionalId,
          unitId: unit.id,
          dayOfWeek: schedule.dayOfWeek,
          start: schedule.start,
          end: schedule.end,
          createdAt: new Date(schedule.createdAt),
          updatedAt: new Date(schedule.updatedAt),
        })
      })

      return unitStore.set(unit.id, {
        id: unit.id,
        address: unit.address.id,
        name: unit.name,
        phone: unit.phone,
        schedules: unit.schedules?.map((schedule) => schedule.id) || [],
        professionalSchedules: unit.professionalSchedules?.map((schedule) => schedule.id) || [],
        createdAt: new Date(unit.createdAt),
        updatedAt: new Date(unit.updatedAt),
      })
    })
  }

  const fetchUnits = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createUnitApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)
        return
      }

      setUnits(toUnit(response.units))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro ao carregar as unidades")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const handleDeleteUnit = async (unitId: number): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createUnitApi(api).delete(unitId)
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)
        return
      }

      setUnits((currentUnits) => currentUnits.filter((unit) => unit.id !== unitId))
      showSuccessToast("Unidade excluída com sucesso")
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro ao excluir a unidade")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <View className="flex-row items-center gap-2 flex-1">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-9 w-9 items-center justify-center"
          >
            <ChevronLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>

          <Text className="text-neutral-800 text-lg font-semibold">Unidades</Text>
        </View>
      </View>

      {units.length === 0 && !loadingStore.isLoading ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-neutral-200 items-center justify-center">
              <Building2 size={40} color={colors.neutral[500]} />
            </View>

            <View className="items-center gap-2">
              <Text className="text-neutral-800 text-lg font-bold text-center">
                Nenhuma unidade cadastrada
              </Text>

              <Text className="text-neutral-600 text-sm text-center leading-5">
                Ainda não há unidades de saúde cadastradas no sistema. Cadastre a primeira unidade
                para começar.
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          className="p-4"
          contentContainerClassName="flex-col gap-2"
          showsVerticalScrollIndicator={false}
        >
          {units.map((unit) => (
            <Swipeable key={unit.id} onSwipeComplete={() => handleDeleteUnit(unit.id)}>
              {(animatedStyle) => (
                <Animated.View
                  className="flex-col justify-center bg-transparent border border-neutral-500 rounded-2xl shadow-lg p-4 overflow-hidden"
                  style={[animatedStyle]}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("UnitDetails", { unit })}
                    className="active:bg-neutral-200/60 active:scale-95"
                    accessibilityRole="button"
                    accessibilityLabel={`Ver detalhes da unidade ${unit.name}`}
                  >
                    <View className="flex-row items-center">
                      <View className="flex-1 gap-2">
                        <View className="flex-row items-center justify-between">
                          <Text
                            className="text-neutral-800 text-base font-extrabold flex-1"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {unit.name}
                          </Text>
                        </View>

                        <Text
                          className="text-neutral-600 text-sm"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {unit.address.street}, {unit.address.number} – {unit.address.district},{" "}
                          {unit.address.city} – {unit.address.state}
                        </Text>

                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center gap-2">
                            <Phone size={16} color={colors.primary[500]} />

                            <Text className="text-neutral-800 text-sm tracking-wide">
                              {formatPhone(unit.phone)}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className="items-center justify-center">
                        <ChevronRight size={20} color={colors.neutral[500]} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Swipeable>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          navigation.navigate("UnitRegister")
        }}
        className="absolute bottom-6 right-6 bg-primary-500 h-14 w-14 rounded-full items-center justify-center shadow-lg active:opacity-70"
      >
        <Plus size={24} color={colors.neutral[900]} />
      </TouchableOpacity>
    </View>
  )
}
