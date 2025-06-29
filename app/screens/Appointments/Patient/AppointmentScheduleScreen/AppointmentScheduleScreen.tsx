import { FC, ReactElement } from "react"
import { View } from "react-native"
import { useStores } from "@/models"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import { AppointmentSchedule } from "@/screens/Appointments/Patient"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { api } from "@/services/api"
import { Appointment } from "@/models/Appointment"
import { PatientAppStackScreenProps } from "@/navigators"

export interface AppointmentSchedulePayload {
  unitId?: number
  specialtyId?: number
  professionalId?: number
  scheduledFor?: string
}

interface AppointmentScheduleScreenProps
  extends PatientAppStackScreenProps<"AppointmentSchedule"> {}

export const AppointmentScheduleScreen: FC<AppointmentScheduleScreenProps> = ({
  navigation,
  route,
}: AppointmentScheduleScreenProps): ReactElement => {
  const { appointment } = route.params as { appointment?: Appointment }

  const { loadingStore, userStore } = useStores()

  const schedule: (data: AppointmentSchedulePayload) => Promise<void> = async (
    data: AppointmentSchedulePayload,
  ): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAppointmentApi(api).book({
        professional_id: data.professionalId!,
        patient_id: userStore.user!.id!,
        unit_id: data.unitId!,
        scheduled_for: data.scheduledFor!,
      })
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      showSuccessToast("Consulta agendada com sucesso!")

      navigation.navigate("Home" as never)
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const reschedule: (scheduledFor: string) => Promise<void> = async (
    scheduledFor: string,
  ): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAppointmentApi(api).update(appointment!.id, {
        scheduled_for: scheduledFor,
      })
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      showSuccessToast("Consulta reagendada com sucesso")

      navigation.navigate("Home")
    } catch (error: any) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <AppointmentSchedule.Form.Root
        onSubmit={
          appointment
            ? (data: AppointmentSchedulePayload): Promise<void> => reschedule(data.scheduledFor!)
            : (data: AppointmentSchedulePayload): Promise<void> => schedule(data)
        }
        onBack={() => navigation.goBack()}
        appointment={appointment}
      />
    </View>
  )
}
