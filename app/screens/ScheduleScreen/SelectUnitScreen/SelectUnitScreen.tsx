import { ReactElement, useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { TextInput } from "@/components/TextInput"
import { AppStackScreenProps } from "@/navigators"
import { Unit } from "@/models/Unit"
import { Search } from "lucide-react-native"
import { UnitCard } from "@/screens/ScheduleScreen/SelectUnitScreen/UnitCard"

interface SelectUnitScreenProps extends AppStackScreenProps<"SelectUnit"> {}

export const SelectUnitScreen = ({ navigation }: SelectUnitScreenProps): ReactElement => {
  const [units, setUnits] = useState<Unit[]>([])
  const [filteredUnits, setFilteredUnits] = useState<Unit[]>([])
  const [search, setSearch] = useState<string>("")

  const fetchUnits = (): void => {
    const units: Unit[] = [
      {
        id: "4b3e56ec-2bfa-4e95-a34d-7ef452faeb4a",
        name: "Southside Medical Center",
        address: {
          id: "f62dbe2f-12f9-4035-8b8d-217169d3e4a2",
          zipCode: "00000-000",
          state: "SP",
          city: "São Paulo",
          district: "Centro",
          street: "Maple St.",
          number: "101",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        distance: "1.2 mi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9d7c032a-6467-4a64-92c3-0a9c2f529672",
        name: "Riverside Health Clinic",
        address: {
          id: "09a9e1cd-fc1b-4c13-a30e-8a6c3f3a3aa3",
          zipCode: "00000-001",
          state: "SP",
          city: "São Paulo",
          district: "Centro",
          street: "Oak Ave.",
          number: "250",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        distance: "2.5 mi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    setUnits(units)
    setFilteredUnits(units)
  }

  useEffect((): void => fetchUnits(), [])

  useEffect((): void => {
    const filtered: Unit[] = units.filter((unit: Unit): boolean =>
      unit.name.toLowerCase().includes(search.toLowerCase()),
    )

    setFilteredUnits(filtered)
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
          <UnitCard
            unit={unit}
            onPress={() => navigation.navigate("SelectSpecialty", { unit })}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4"
      />
    </View>
  )
}
