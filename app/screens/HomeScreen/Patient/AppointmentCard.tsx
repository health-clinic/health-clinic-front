import { Text, View } from "react-native"
import { ReactElement } from "react"
import { Appointment } from "@/models/Appointment"
import { CalendarDays } from "lucide-react-native"

interface HistoryCardProps {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: HistoryCardProps): ReactElement => {
  return (
    <View className="w-full p-4 rounded-2xl border border-primary-500 bg-neutral-200">
      <Text className="text-white font-semibold">{appointment.professional.user.name}</Text>

      <Text className="text-zinc-400 text-sm">{appointment.professional.specialty.name}</Text>

      <View className="flex-row items-center space-x-1 mt-2">
        <CalendarDays className="text-primary-300" size={16} />

        <Text className="text-zinc-400 text-sm">19/04/2025</Text>
      </View>
    </View>
  )
}
