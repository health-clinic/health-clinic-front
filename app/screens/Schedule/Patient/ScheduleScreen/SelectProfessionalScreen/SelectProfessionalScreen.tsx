import { AppStackScreenProps } from "@/navigators"
import { ReactElement, useEffect, useState } from "react"
import { Professional } from "@/models/Professional"
import { FlatList, Text, View } from "react-native"
import { ProfessionalCard } from "@/screens/Schedule/Patient/ScheduleScreen/SelectProfessionalScreen/ProfessionalCard"
import { Unit } from "@/models/Unit/unit.model"
import { showErrorToast } from "@/components/toast"
import { useStores } from "@/models"
import { ProfessionalResponse } from "@/services/professional/professional.api.types"
import { createProfessionalApi } from "@/services/professional/professional.api"
import { GeneralApiProblem } from "@/services/api/apiProblem"
import { api } from "@/services/api"

interface SelectProfessionalScreenProps extends AppStackScreenProps<"SelectProfessional"> {}

export const SelectProfessionalScreen = ({
  navigation,
  route,
}: SelectProfessionalScreenProps): ReactElement => {
  const { specialty, unit } = route.params as { specialty: string; unit: Unit }
  const { loadingStore, professionalStore, userStore } = useStores()

  const [professionals, setProfessionals] = useState<Professional[]>([])

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
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })

      return professionalStore.set(professional.id, {
        id: professional.id,
        specialty: professional.specialty,
        unit: unit.id,
        user: professional.id,
        crm: "",
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })
    })
  }

  const fetchProfessionals: () => Promise<void> = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response: { kind: "ok"; units: Unit[] } | GeneralApiProblem =
        await createProfessionalApi(api).findAll({ specialty })
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

  useEffect((): void => {
    fetchProfessionals()
  }, [])

  return (
    <View className="flex-1 gap-6 p-6">
      <Text className="text-center text-xl font-semibold text-primary-500" preset="heading">
        Escolha um médico
      </Text>

      <Text className="text-center text-zinc-400 font-medium mb-4">{specialty}</Text>

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
