import { ReactElement, useEffect, useState } from "react"
import { AppStackScreenProps } from "@/navigators"
import { Specialty } from "@/models/Specialty"
import { FlatList, Text, View } from "react-native"
import { SpecialtyList } from "@/screens/ScheduleScreen/SelectSpecialtyScreen/SpecialtyList"
import { SpecialtyCard } from "@/screens/ScheduleScreen/SelectSpecialtyScreen/SpecialtyCard"

interface SelectSpecialtyScreenProps extends AppStackScreenProps<"SelectSpecialty"> {}

export const SelectSpecialtyScreen = ({
  navigation,
  route,
}: SelectSpecialtyScreenProps): ReactElement => {
  const { unit } = route.params

  const [specialties, setSpecialties] = useState<Specialty[]>([])

  const fetchSpecialties = (): void => {
    const specialties: Specialty[] = [
      {
        id: "1",
        name: "Pediatria",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Dermatologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Cardiologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        name: "Clínica Geral",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    setSpecialties(specialties)
  }

  useEffect((): void => fetchSpecialties(), [])

  return (
    <View className="flex-1 gap-6 p-6">
      <Text className="text-center text-xl font-semibold text-primary-500" preset="heading">
        Escolha uma especialidade
      </Text>

      <FlatList
        data={specialties}
        numColumns={2}
        keyExtractor={(specialty: Specialty) => specialty.id}
        renderItem={({ item: specialty }) => (
          <SpecialtyCard
            specialty={specialty}
            onPress={() => navigation.navigate("SelectProfessional", { specialty, unit })}
          />
        )}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
