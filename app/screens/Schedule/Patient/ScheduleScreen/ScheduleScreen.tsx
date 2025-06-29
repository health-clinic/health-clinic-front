import React, { FC, ReactElement } from "react"
import { View } from "react-native"
import { PatientAppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import { AppointmentSchedule } from "@/screens/Appointments/Patient"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { api } from "@/services/api"

export interface SchedulePayload {
  unitId?: number
  specialtyId?: number
  professionalId?: number
  scheduledFor?: string
  complaint?: string
}

interface ScheduleScreenProps extends PatientAppStackScreenProps<"SelectUnit"> {}

export const ScheduleScreen: FC<ScheduleScreenProps> = ({
  navigation,
  route,
}: ScheduleScreenProps): ReactElement => {
  const { loadingStore } = useStores()

  const scheduleAppointment = async (formData: SchedulePayload): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const appointmentData = {
        professional_id: formData.professionalId!,
        scheduled_for: formData.scheduledFor!,
        complaint: formData.complaint || "",
      }

      const response = await createAppointmentApi(api).create(appointmentData)

      if (response.kind !== "ok") {
        showErrorToast(response.data?.error || "Erro ao agendar consulta")
        return
      }

      showSuccessToast("Consulta agendada com sucesso!")
      navigation.navigate("Home")
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
      <AppointmentSchedule.Form.Root onSubmit={scheduleAppointment} onBack={handleBack} />
    </View>
  )
}
