import { Patient } from "@/models/Patient"
import { ReactElement } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { ArrowRight } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

interface PatientCardProps {
  patient: Patient
}

export const PatientCard = ({ patient }: PatientCardProps): ReactElement => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className="bg-neutral-300 rounded-2xl p-4 flex-row items-center justify-between border border-primary-500 shadow-sm"
      onPress={() => navigation.navigate("PatientProfile", { patient })}
      activeOpacity={0.7}
    >
      <View className="flex-1">
        <Text className="text-white font-bold text-lg">{patient.user.name} (F, 24)</Text>

        <Text className="text-neutral-600 text-sm">ID #{patient.id}</Text>
      </View>

      <ArrowRight size={20} color="#8A8A8A" />
    </TouchableOpacity>
  )
}
