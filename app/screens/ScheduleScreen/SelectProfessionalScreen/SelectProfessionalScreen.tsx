import { AppStackScreenProps } from "@/navigators"
import { ReactElement, useEffect, useState } from "react"
import { Professional } from "@/models/Professional"
import { FlatList, Text, View } from "react-native"
import { ProfessionalCard } from "@/screens/ScheduleScreen/SelectProfessionalScreen/ProfessionalCard"
import { Unit } from "@/models/Unit"
import { Specialty } from "@/models/Specialty"

interface SelectProfessionalScreenProps extends AppStackScreenProps<"SelectProfessional"> {}

export const SelectProfessionalScreen = ({
  navigation,
  route,
}: SelectProfessionalScreenProps): ReactElement => {
  const { specialty, unit } = route.params as { specialty: Specialty; unit: Unit }

  const [professionals, setProfessionals] = useState<Professional[]>([])

  const fetchProfessionals = (): void => {
    const professionals: Professional[] = [
      {
        id: "1",
        specialty: {
          id: "1",
          name: "Cardiology",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        unit: {
          id: "1",
          name: "Southside Medical Center",
          distance: "1.2 mi",
          createdAt: new Date(),
          updatedAt: new Date(),
          address: {
            id: "1",
            zipCode: "12345-678",
            state: "CA",
            city: "Los Angeles",
            district: "Downtown",
            street: "Main St",
            number: "100",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        user: {
          id: "1",
          name: "Dr. Jane Doe",
          email: "jane.doe@example.com",
          phone: "+1 555-1234",
          birthdate: "1980-06-15",
          document: "123.456.789-00",
          role: "DOCTOR",
          createdAt: new Date(),
          updatedAt: new Date(),
          address: {
            id: "1",
            zipCode: "12345-678",
            state: "CA",
            city: "Los Angeles",
            district: "Downtown",
            street: "Main St",
            number: "100",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          admin: undefined,
          professional: "1",
          patient: undefined,
        },
        crm: "CRM123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        specialty: {
          id: "2",
          name: "Cardiology",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        unit: {
          id: "2",
          name: "Southside Medical Center",
          distance: "1.2 mi",
          createdAt: new Date(),
          updatedAt: new Date(),
          address: {
            id: "2",
            zipCode: "12345-678",
            state: "CA",
            city: "Los Angeles",
            district: "Downtown",
            street: "Main St",
            number: "100",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        user: {
          id: "2",
          name: "Dr. Jane Doe",
          email: "jane.doe@example.com",
          phone: "+1 555-1234",
          birthdate: "1980-06-15",
          document: "123.456.789-00",
          role: "DOCTOR",
          createdAt: new Date(),
          updatedAt: new Date(),
          address: {
            id: "2",
            zipCode: "12345-678",
            state: "CA",
            city: "Los Angeles",
            district: "Downtown",
            street: "Main St",
            number: "100",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          admin: undefined,
          professional: "2",
          patient: undefined,
        },
        crm: "CRM123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    setProfessionals(professionals)
  }

  useEffect((): void => fetchProfessionals(), [])

  return (
    <View className="flex-1 gap-6 p-6">
      <Text className="text-center text-xl font-semibold text-primary-500" preset="heading">
        Escolha um médico
      </Text>

      <Text className="text-center text-zinc-400 font-medium mb-4">{specialty.name}</Text>

      <FlatList
        data={professionals}
        keyExtractor={(professional: Professional) => professional.id}
        renderItem={({ item: professional }) => (
          <ProfessionalCard
            professional={professional}
            onPress={() => navigation.navigate("SelectDateTime", { professional })}
          />
        )}
        contentContainerClassName="gap-4"
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
