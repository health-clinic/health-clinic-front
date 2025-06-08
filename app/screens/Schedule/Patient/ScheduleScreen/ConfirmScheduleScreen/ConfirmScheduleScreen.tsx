import { Button } from "@/components/Button"
import { AppStackScreenProps } from "@/navigators"
import { ReactElement } from "react"
import { Text, View } from "react-native"
import { AppointmentDetailItem } from "./AppointmentDetailItem"
import { Building, Calendar, Stethoscope, User } from "lucide-react-native"
import { api } from "@/services/api"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { Professional } from "@/models/Professional"
import { useStores } from "@/models"
import { showErrorToast, showSuccessToast } from "@/components/toast"
import { format } from "date-fns"

interface ConfirmScheduleScreenProps extends AppStackScreenProps<"ConfirmSchedule"> {}

export const ConfirmScheduleScreen = ({
  navigation,
  route,
}: ConfirmScheduleScreenProps): ReactElement => {
  const { appointmentId, professional, scheduledFor } = route.params as {
    appointmentId?: number
    professional: Professional
    scheduledFor: string
  }
  const { loadingStore } = useStores()

  const schedule: () => Promise<void> = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAppointmentApi(api).book({
        professional_id: professional.id,
        patient_id: 1,
        unit_id: professional.unit.id,
        scheduled_for: scheduledFor,
      })
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      showSuccessToast("Consulta agendada com sucesso")

      navigation.navigate("Home")
    } catch (error) {
      console.error("Error schedulling appointment:", error)

      showErrorToast("Ocorreu um erro ao agendar a consulta")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const reschedule: () => Promise<void> = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createAppointmentApi(api).update(appointmentId, { scheduledFor })
      if (response.kind !== "ok") {
        showErrorToast(response.data.error)

        return
      }

      showSuccessToast("Consulta reagendada com sucesso")

      navigation.navigate("Home")
    } catch (error) {
      console.error("Error reschedulling appointment:", error)
      showErrorToast("Ocorreu um erro ao reagendar a consulta")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  return (
    <View className="flex-1 gap-6 p-6">
      <Text className="text-center text-xl font-semibold text-primary-500" preset="heading">
        Revise suas informações
      </Text>

      <View className="flex gap-2">
        <AppointmentDetailItem icon={Building} label="Unidade" value={professional.unit.name} />

        <AppointmentDetailItem
          icon={Stethoscope}
          label="Especialidade"
          value={professional.specialty}
        />

        <AppointmentDetailItem icon={User} label="Profissional" value={professional.user.name} />

        <AppointmentDetailItem
          icon={Calendar}
          label="Data e Hora"
          value={format(scheduledFor, "dd/MM/yyyy HH:mm")}
        />
      </View>

      {appointmentId ? (
        <Button onPress={reschedule}>
          <Text className="text-white font-semibold">Confirmar reagendamento</Text>
        </Button>
      ) : (
        <Button onPress={schedule}>
          <Text className="text-white font-semibold">Confirmar agendamento</Text>
        </Button>
      )}
    </View>
  )
}
