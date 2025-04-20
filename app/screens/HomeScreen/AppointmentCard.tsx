import { Text, View } from "react-native"
import { ReactElement } from "react"
import { Appointment } from "@/models/Appointment"
import { CalendarDays } from "lucide-react-native"

interface HistoryCardProps {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: HistoryCardProps): ReactElement => {
  return (
    <View className="w-full rounded-2xl border border-zinc-700 p-4 space-y-2 bg-zinc-900">
      <Text className="text-white font-semibold">{appointment.doctor.user.name}</Text>

      <Text className="text-zinc-400 text-sm">{appointment.doctor.specialty}</Text>

      <View className="flex-row items-center space-x-1 mt-2">
        <CalendarDays className="text-primary-300" size={16} />

        <Text className="text-zinc-400 text-sm">19/04/2025</Text>
      </View>
    </View>
  )
}
