import { Button } from "@/components/Button"
import { AppStackScreenProps } from "@/navigators"
import { ReactElement, useState } from "react"
import { Alert, Text, View } from "react-native"
import { AppointmentDetailItem } from "./AppointmentDetailItem"
import { Calendar, Building, Stethoscope, User } from "lucide-react-native"
import { api } from "@/services/api"
import { createAppointmentApi } from "@/services/appointment/appointment.api"
import { Professional } from "@/models/Professional"

interface ConfirmScheduleScreenProps extends AppStackScreenProps<"ConfirmSchedule"> {}

export const ConfirmScheduleScreen = ({
  navigation,
  route,
}: ConfirmScheduleScreenProps): ReactElement => {
  const { professional, date, time } = route.params as {
    professional: Professional
    date: string
    time: string
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const scheduleAppointment = async (): Promise<void> => {
    setIsLoading(true)

    const { kind } = await createAppointmentApi(api).schedule({
      professional_id: professional.id,
      patient_id: 1,
      unit_id: professional.unit.id,
      date,
      time,
    })
    if (kind !== "ok") {
      setIsLoading(false)
      Alert.alert(
        "Erro ao agendar consulta",
        "Ocorreu um problema ao tentar agendar sua consulta. Tente novamente mais tarde.",
      )

      return
    }

    setIsLoading(false)

    navigation.navigate("Home")
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
          value={professional.specialty.name}
        />

        <AppointmentDetailItem icon={User} label="Profissional" value={professional.user.name} />

        <AppointmentDetailItem icon={Calendar} label="Data e Hora" value="20/04/2025 12:12:00" />
      </View>

      <Button isLoading={isLoading} onPress={scheduleAppointment}>
        <Text className="text-white font-semibold">Confirmar agendamento</Text>
      </Button>
    </View>
  )
}
