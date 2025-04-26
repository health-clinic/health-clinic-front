import { Link } from "@/components/Link"
import { Calendar, MapPin } from "lucide-react-native"
import { ReactElement } from "react"
import { Image, Text, View } from "react-native"
import { Button } from "@/components/Button"
import { Appointment } from "@/models/Appointment"

interface NextAppointmentProps {
  appointment: Appointment
}

export const NextAppointment = ({ appointment }: NextAppointmentProps): ReactElement => {
  return (
    <View className="border border-primary-500 rounded-2xl p-4 bg-neutral-200 space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-primary-500 font-semibold text-sm">Próxima Consulta</Text>

        <Link text="Ver detalhes" />
      </View>

      <View className="flex-row items-center">
        <Image className="w-10 h-10 rounded-full border border-primary-400" />

        <View className="flex-1 ml-3">
          <Text className="text-neutral-900 font-semibold text-base">
            {appointment.professional.user.name}
          </Text>

          <Text className="text-zinc-400 text-sm">{appointment.professional.specialty.name}</Text>

          <View className="flex-row items-center flex-wrap gap-2 mt-1">
            <View className="flex-row items-center">
              <Calendar className="text-primary-500 mr-1" size={16} />

              <Text className="text-neutral-500 text-xs">Hoje, {appointment.time}</Text>
            </View>

            <View className="w-1 h-1 bg-primary-400 rounded-full" />

            <View className="flex-row items-center">
              <MapPin className="text-primary-500 mr-1" size={16} />

              <Text className="text-neutral-500 text-xs">{appointment.unit.name}</Text>
            </View>
          </View>
        </View>
      </View>

      <Button
        className="mt-2 py-2 rounded-xl bg-primary-500 active:opacity-90 shadow-sm"
        onPress={() => undefined}
      >
        <Text className="text-white font-semibold text-sm text-center">Confirmar presença</Text>
      </Button>
    </View>
  )
}
