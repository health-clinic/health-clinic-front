import { AppStackScreenProps } from "@/navigators"
import { ReactElement, useEffect, useState } from "react"
import { Doctor } from "@/models/Doctor"
import { View } from "react-native"
import { DoctorList } from "./DoctorList"

interface SelectDoctorScreenProps extends AppStackScreenProps<"SelectDoctor"> {}

export const SelectDoctorScreen = ({
  navigation,
  route,
}: SelectDoctorScreenProps): ReactElement => {
  const { specialty, unit } = route.params

  const [doctors, setDoctors] = useState<Doctor[]>([])

  const fetchDoctors = (): void => {
    const doctors: Doctor[] = []

    setDoctors(doctors)
  }

  useEffect((): void => fetchDoctors(), [])

  return (
    <View className="flex-1 bg-background px-6 pt-10 gap-6">
      <Text preset="heading" className="text-center">
        Escolha uma especialidade
      </Text>

      <Text className="text-center text-primary font-medium mb-4">{specialty.name}</Text>

      <DoctorList
        onSelect={(doctor: Doctor): void => navigation.navigate("SelectDateTime", { doctor })}
        doctors={doctors}
      />
    </View>
  )
}
