import { ReactElement } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { ArrowLeft } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { Appointment } from "@/models/Appointment"

interface AppointmentHeaderProps {
  appointment: Appointment
}

export const AppointmentHeader = ({ appointment }: AppointmentHeaderProps): ReactElement => {
  const navigation = useNavigation()

  return (
    <View className="flex flex-row items-center px-4 h-16 bg-neutral-200">
      <TouchableOpacity onPress={navigation.goBack} className="pr-4 py-2">
        <ArrowLeft className="w-8 h-8 text-white" />
      </TouchableOpacity>

      <View className="flex-1 flex-col">
        <Text className="text-white font-bold text-lg">{appointment.patient.user.name}</Text>

        <View className="flex flex-row items-center justify-between mt-0.5">
          <Text className="text-neutral-600 text-xs">{appointment.date}</Text>

          <View className="bg-green-500 px-2 py-0.5 rounded-full">
            <Text className="text-white text-xs">{appointment.status}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
