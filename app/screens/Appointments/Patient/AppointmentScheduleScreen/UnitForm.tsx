import { FC, ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Building2, Check, ChevronLeft, MapPin, Phone } from "lucide-react-native"
import { StepIndicator } from "@/components/StepIndicator"
import { Unit } from "@/models/Unit"
import { useStores } from "@/models"
import { createUnitApi } from "@/services/unit/unit.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { UnitResponse } from "@/services/unit/unit.api.types"
import { formatPhone } from "@/utils/formatters"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

interface UnitFormProps {
  onNext: (unit: Unit) => void
  onBack: () => void
}

export const UnitForm: FC<UnitFormProps> = ({ onNext, onBack }: UnitFormProps): ReactElement => {
  const navigation = useNavigation()
  const { addressStore, loadingStore, unitStore } = useStores()
  const colors = tailwind.theme.extend.colors

  const [units, setUnits] = useState<Unit[]>([])
  const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>()

  const toUnits = (data: UnitResponse): Unit[] => {
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

      return unitStore.set(unit.id, {
        id: unit.id,
        address: unit.address.id,
        name: unit.name,
        phone: unit.phone,
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

      setUnits(toUnits(response.units))
    } catch (error) {
      console.error(error)
      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  const next = () => {
    if (!selectedUnit) {
      return
    }

    onNext(selectedUnit)
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
        <StepIndicator currentStep={1} totalSteps={5} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <MapPin size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Selecione a unidade</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Escolha a unidade de saúde onde deseja ser atendido
          </Text>
        </View>

        <View className="flex-1 gap-4">
          {units.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              <View className="gap-4">
                {units.map((unit: Unit) => {
                  const isSelected = selectedUnit?.id === unit.id

                  return (
                    <TouchableOpacity
                      key={unit.id}
                      onPress={() => setSelectedUnit(unit)}
                      className={`border rounded-2xl p-4 active:opacity-70 ${
                        isSelected ? "border-primary-500" : "border-neutral-500"
                      }`}
                    >
                      <View className="flex-row items-center">
                        <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                          <Building2 size={20} color={colors.neutral[500]} />
                        </View>

                        <View className="flex-1">
                          <Text className="text-neutral-900 font-semibold text-base">
                            {unit.name}
                          </Text>

                          <View className="flex-row items-center mt-1">
                            <Phone size={14} color={colors.primary[500]} />
                            <Text className="text-neutral-600 text-sm ml-1">
                              {formatPhone(unit.phone)}
                            </Text>
                          </View>

                          <View className="flex-row items-center mt-1">
                            <MapPin size={14} color={colors.primary[500]} />
                            <Text className="text-neutral-600 text-sm ml-1">
                              {unit.address?.city}, {unit.address?.state}
                            </Text>
                          </View>
                        </View>

                        {isSelected && (
                          <View className="justify-center ml-2">
                            <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                              <Check size={16} color="#000000" />
                            </View>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="flex flex-col gap-4 px-4">
              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-900 font-medium text-base text-center">
                  Nenhuma unidade encontrada
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Não foi possível encontrar unidades de saúde na sua região. Tente novamente ou
                  entre em contato conosco.
                </Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={next}
          disabled={!selectedUnit}
          className={`w-full items-center py-4 rounded-xl ${
            selectedUnit ? "bg-primary-600" : "bg-neutral-300"
          }`}
        >
          <Text
            className={`text-base font-bold ${
              selectedUnit ? "text-neutral-900" : "text-neutral-500"
            }`}
          >
            Próximo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
