import { ReactElement, useEffect, useState } from "react"
import { AppStackScreenProps } from "@/navigators"
import { Specialty } from "@/models/Specialty"
import { View } from "react-native"
import { SpecialtyList } from "@/screens/Schedule/SelectSpecialtyScreen/SpecialtyList"

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
    <View className="flex-1 bg-background px-6 pt-10 gap-6">
      <Text preset="heading" className="text-center">
        Escolha uma especialidade
      </Text>

      <SpecialtyList
        onSelect={(specialty: Specialty): void =>
          navigation.navigate("SelectDoctor", { specialty, unit })
        }
        specialties={specialties}
      />
    </View>
  )
}
