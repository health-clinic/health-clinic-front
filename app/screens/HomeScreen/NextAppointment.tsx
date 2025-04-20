import { Link } from "@/components/Link"
import { CalendarDays, Mail, MapPin } from "lucide-react-native"
import { ReactElement } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { Button } from "@/components/Button"
import { Appointment } from "@/models/Appointment"

interface NextAppointmentProps {
  appointment: Appointment
}

export const NextAppointment = ({ appointment }: NextAppointmentProps): ReactElement => {
  return (
    <View className="border border-zinc-700 rounded-2xl p-4 bg-zinc-900 space-y-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-2">
          <Mail className="text-primary-300" />
          <Text className="text-white font-semibold text-sm">Próxima Consulta</Text>
        </View>

        <Link text="Ver detalhes" />
      </View>

      <View className="flex-row items-start space-x-3">
        <Image
          source={require("./../../../assets/images/avatar.png")}
          className="rounded-full"
          style={{ width: 40, height: 40 }}
        />

        <View className="flex-1 space-y-1">
          <Text className="text-white font-semibold">{appointment.doctor.user.name}</Text>
          <Text className="text-zinc-400 text-sm">{appointment.doctor.specialty}</Text>

          <View className="flex-row items-center space-x-1 mt-2">
            <CalendarDays size={16} color="#9ca3af" />

            <Text className="text-zinc-400 text-sm">Hoje, 14:30</Text>
          </View>

          <View className="flex-row items-center space-x-1">
            <MapPin size={16} color="#9ca3af" />

            <Text className="text-zinc-400 text-sm">Clínica Central</Text>
          </View>
        </View>
      </View>

      <Button>
        <Text className="text-white font-semibold">Confirmar presença</Text>
      </Button>
    </View>
  )
}
