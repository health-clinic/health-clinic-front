import { Text, View } from "react-native"
import { ReactElement } from "react"
import { Appointment } from "@/models/Appointment"
import { CalendarDays } from "lucide-react-native"
import tailwind from "./../../../../tailwind.config"

interface HistoryCardProps {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: HistoryCardProps): ReactElement => {
  const colors = tailwind.theme.extend.colors

  return (
    <View className="w-full p-4 rounded-2xl border border-neutral-500 flex flex-col gap-2">
      <Text className="text-white font-semibold">{appointment.professional.user.name}</Text>

      <Text className="text-zinc-400 text-sm">{appointment.professional.specialty.name}</Text>

      <View className="flex-row items-center gap-1">
        <CalendarDays color={colors.primary[300]} size={16} />

        <Text className="text-zinc-400 text-sm">19/04/2025</Text>
      </View>
    </View>
  )
}
