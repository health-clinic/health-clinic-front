import { ReactElement } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { ChevronLeft } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

interface PrescriptionHeaderProps {
  title: string
}

export const PrescriptionHeader = ({ title }: PrescriptionHeaderProps): ReactElement => {
  const navigation = useNavigation()

  return (
    <View className="flex-row items-center gap-4 p-4 bg-neutral-100">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeft size={24} color="white" />
      </TouchableOpacity>

      <Text className="text-white text-lg font-bold">{title}</Text>
    </View>
  )
}
