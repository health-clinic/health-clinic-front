import { Button } from "@/components/Button"
import { AppStackScreenProps } from "@/navigators"
import { ReactElement } from "react"
import { Text, View } from "react-native"
import { AppointmentDetailItem } from "./AppointmentDetailItem"
import { Building, Stethoscope, User } from "lucide-react-native"
import { Calendar } from "react-native-calendars"

interface ConfirmAppointmentScreenProps extends AppStackScreenProps<"ConfirmAppointment"> {}

export const ConfirmAppointmentScreen = ({
  navigation,
  route,
}: ConfirmAppointmentScreenProps): ReactElement => {
  const { doctor, date, time } = route.params

  const scheduleAppointment = (): void => {
    navigation.navigate("Home")
  }

  return (
    <View className="flex-1 bg-background px-4 py-6">
      <Text preset="heading" className="text-center">
        Escolha uma especialidade
      </Text>

      <View className="space-y-4 mb-6">
        <AppointmentDetailItem icon={Building} label="Unidade" value={doctor.unit.name} />

        <AppointmentDetailItem
          icon={Stethoscope}
          label="Especialidade"
          value={doctor.specialty.name}
        />

        <AppointmentDetailItem icon={User} label="Profissional" value={doctor.user.name} />

        <AppointmentDetailItem icon={Calendar} label="Data e Hora" value="12:12" />
      </View>

      <Button onPress={scheduleAppointment}>Confirmar agendamento</Button>
    </View>
  )
}
