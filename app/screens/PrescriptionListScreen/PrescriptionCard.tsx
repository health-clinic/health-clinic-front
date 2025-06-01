import { ReactElement } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Prescription } from "@/models/Prescription"
import { AppStackScreenProps } from "@/navigators"

interface PrescriptionCardProps {
  prescription: Prescription
}

export const PrescriptionCard = ({ prescription }: PrescriptionCardProps): ReactElement => {
  const navigation = useNavigation<AppStackScreenProps<"PrescriptionDetails">["navigation"]>()

  return (
    <TouchableOpacity
      className="border border-neutral-500 rounded-2xl overflow-hidden mb-3 active:opacity-90"
      onPress={() =>
        navigation.navigate("PrescriptionDetails", {
          prescription,
        })
      }
    >
      <View className="p-4">
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text className="text-white font-semibold text-base">{prescription.name}</Text>
            <Text className="text-zinc-400 text-sm">
              {prescription.dosage} • {prescription.frequency}
            </Text>
          </View>
          <Text className="text-zinc-400 text-xs">{prescription.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
