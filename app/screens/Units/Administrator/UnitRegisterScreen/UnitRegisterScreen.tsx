import { FC, ReactElement } from "react"
import { View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import { UnitRegisterForm } from "./UnitRegisterForm"
import type { CreateUnitData, UpdateUnitData } from "@/services/unit/unit.api"
import { createUnitApi } from "@/services/unit/unit.api"
import { api } from "@/services/api"

interface RegisterScreenProps extends AdministratorAppStackScreenProps<"UnitRegister"> {}

interface FormProfessionalSchedule {
  professionalId: number
  dayOfWeek: string
  start: string
  end: string
  closed?: boolean
}

interface ExtendedCreateUnitData {
  name?: string
  phone?: string
  address?: {
    zipCode?: string
    state?: string
    city?: string
    district?: string
    street?: string
    number?: number
  }
  professionals?: {
    id: number
    name: string
    specialty: string
    schedules: FormProfessionalSchedule[]
  }[]
  schedules?: {
    dayOfWeek: string
    opening: string
    closing: string
    closed: boolean
  }[]
}

export const UnitRegisterScreen: FC<RegisterScreenProps> = ({
  navigation,
  route,
}: RegisterScreenProps): ReactElement => {
  const { loadingStore } = useStores()
  const { unit } = route.params || {}

  const getDayOfWeek = (dayName: string): number => {
    const days = {
      "Domingo": 0,
      "Segunda-feira": 1,
      "Terça-feira": 2,
      "Quarta-feira": 3,
      "Quinta-feira": 4,
      "Sexta-feira": 5,
      "Sábado": 6,
    }
    return days[dayName as keyof typeof days] ?? 0
  }

  const transformFormDataForCreate = (formData: ExtendedCreateUnitData): CreateUnitData => {
    const address = {
      zip_code: formData.address?.zipCode || "",
      state: formData.address?.state || "",
      city: formData.address?.city || "",
      district: formData.address?.district || "",
      street: formData.address?.street || "",
      number: Number(formData.address?.number) || 0,
    }

    const schedules =
      formData.schedules
        ?.filter((hour) => !hour.closed)
        .map((hour) => ({
          day_of_week: getDayOfWeek(hour.dayOfWeek),
          opening: hour.opening,
          closing: hour.closing,
        })) || []

    const professional_schedules =
      formData.professionals?.flatMap((professional) =>
        professional.schedules
          .filter((schedule) => !schedule.closed)
          .map((schedule) => ({
            professional_id: schedule.professionalId,
            day_of_week: getDayOfWeek(schedule.dayOfWeek),
            start: schedule.start,
            end: schedule.end,
          })),
      ) || []

    return {
      name: formData.name || "",
      phone: formData.phone || "",
      address,
      schedules,
      professional_schedules:
        professional_schedules.length > 0 ? professional_schedules : undefined,
    }
  }

  const transformFormDataForUpdate = (formData: ExtendedCreateUnitData): UpdateUnitData => {
    const address = {
      zip_code: formData.address?.zipCode || "",
      state: formData.address?.state || "",
      city: formData.address?.city || "",
      district: formData.address?.district || "",
      street: formData.address?.street || "",
      number: Number(formData.address?.number) || 0,
    }

    const schedules =
      formData.schedules
        ?.filter((hour) => !hour.closed)
        .map((hour) => ({
          day_of_week: getDayOfWeek(hour.dayOfWeek),
          opening: hour.opening,
          closing: hour.closing,
        })) || []

    const professional_schedules =
      formData.professionals?.flatMap((professional) =>
        professional.schedules
          .filter((schedule) => !schedule.closed)
          .map((schedule) => ({
            professional_id: schedule.professionalId,
            day_of_week: getDayOfWeek(schedule.dayOfWeek),
            start: schedule.start,
            end: schedule.end,
          })),
      ) || []

    return {
      name: formData.name,
      phone: formData.phone,
      address,
      schedules,
      professional_schedules:
        professional_schedules.length > 0 ? professional_schedules : undefined,
    }
  }

  const createOrUpdate = async (formData: ExtendedCreateUnitData): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      let response
      if (unit) {
        // Update existing unit
        const apiData = transformFormDataForUpdate(formData)
        console.log("Transformed data for update:", JSON.stringify(apiData, null, 2))
        response = await createUnitApi(api).update(unit.id, apiData)
        if (response.kind !== "ok") {
          showErrorToast(response.data?.error || "Erro ao atualizar unidade")
          return
        }
        showSuccessToast("Unidade atualizada com sucesso!")
      } else {
        // Create new unit
        const apiData = transformFormDataForCreate(formData)
        console.log("Transformed data for create:", JSON.stringify(apiData, null, 2))
        response = await createUnitApi(api).create(apiData)
        if (response.kind !== "ok") {
          showErrorToast(response.data?.error || "Erro ao criar unidade")
          return
        }
        showSuccessToast("Unidade criada com sucesso!")
      }

      navigation.navigate("UnitList")
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <UnitRegisterForm onSubmit={createOrUpdate} onBack={handleBack} unit={unit} />
    </View>
  )
}
