import { ReactElement, useEffect, useMemo, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { TextInput } from "@/components/TextInput"
import { AppStackScreenProps } from "@/navigators"
import { Unit } from "@/models/Unit/unit.model"
import { Search } from "lucide-react-native"
import { UnitCard } from "@/screens/ScheduleScreen/SelectUnitScreen/UnitCard"
import { GeneralApiProblem } from "@/services/api/apiProblem"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { useStores } from "@/models"
import { UnitResponse } from "@/services/unit/unit.api.types"
import { createUnitApi } from "@/services/unit/unit.api"

interface SelectUnitScreenProps extends AppStackScreenProps<"SelectUnit"> {}

export const SelectUnitScreen = ({ navigation }: SelectUnitScreenProps): ReactElement => {
  const { addressStore, loadingStore, unitStore } = useStores()

  const [units, setUnits] = useState<Unit[]>([])
  const [search, setSearch] = useState<string>("")

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
        distance: unit.distance,
        createdAt: new Date(unit.createdAt),
        updatedAt: new Date(unit.updatedAt),
      })
    })
  }

  const fetchUnits: () => Promise<void> = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response: { kind: "ok"; units: Unit[] } | GeneralApiProblem =
        await createUnitApi(api).findAll()
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

  useEffect((): void => {
    fetchUnits()
  }, [])

  const filteredUnits = useMemo(() => {
    if (!search?.trim()) return units

    return units.filter((unit: Unit) => unit.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, units])

  return (
    <View className="flex-1 gap-6 p-6">
      <Text className="text-center text-xl font-semibold text-primary-500" preset="heading">
        Selecione a unidade
      </Text>

      <View>
        <TextInput.Root>
          <TextInput.Icon icon={Search} />

          <TextInput.Control
            onChangeText={setSearch}
            placeholder="Buscar unidade..."
            value={search}
          />
        </TextInput.Root>
      </View>

      <FlatList
        data={filteredUnits}
        keyExtractor={(unit: Unit) => unit.id}
        renderItem={({ item: unit }) => (
          <UnitCard unit={unit} onPress={() => navigation.navigate("SelectSpecialty", { unit })} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4"
      />
    </View>
  )
}
