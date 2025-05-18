import { Calendar, ChevronRight, Clock, Info } from "lucide-react-native"
import { ReactElement } from "react"
import { Image, Pressable, Text, View } from "react-native"
import { Appointment } from "@/models/Appointment"
import tailwind from "./../../../../tailwind.config"
import { Link } from "@/components/Link"

interface NextAppointmentProps {
  appointment: Appointment
}

export const NextAppointment = ({ appointment }: NextAppointmentProps): ReactElement => {
  const colors = tailwind.theme.extend.colors

  return (
    <View className="px-4 gap-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-semibold text-base">Próxima consulta</Text>
      </View>

      <Pressable
        className="border border-neutral-500 rounded-2xl overflow-hidden active:opacity-90"
        onPress={() => undefined}
      >
        <View className="h-1 bg-blue-500" />

        <View className="flex gap-2 p-4">
          <View className="flex-row items-center">
            <Image
              source={appointment.professional.user.avatar}
              className="w-12 h-12 rounded-full border border-neutral-400 mr-3"
            />

            <View className="flex-1">
              <Text className="text-white font-semibold text-base">
                {appointment.professional.user.name}
              </Text>

              <Text className="text-zinc-400 text-sm">
                {appointment.professional.specialty.name}
              </Text>

              <View className="mt-3 flex-row items-center">
                <View className="flex-row items-center mr-3">
                  <Calendar size={16} color={colors.primary[500]} />

                  <Text className="text-white text-sm ml-2">{appointment.date}</Text>
                </View>

                <View className="flex-row items-center">
                  <Clock size={16} color={colors.primary[500]} />

                  <Text className="text-white text-sm ml-2">{appointment.time}</Text>
                </View>
              </View>
            </View>

            <View className="justify-center ml-2">
              <ChevronRight size={20} color="white" opacity={0.4} />
            </View>
          </View>

          <View className="bg-primary-500/10 border border-primary-500/30 p-3 rounded-lg mt-2 flex-row items-center">
            <View className="bg-blue-500 p-1.5 rounded-full mr-3 self-center">
              <Info size={18} color={colors.neutral[900]} />
            </View>

            <Text className="text-neutral-900 text-xs flex-1">
              Lembre-se de levar seu documento de identidade e chegar 15 minutos antes.
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}
