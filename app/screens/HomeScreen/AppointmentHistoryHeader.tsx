import { Text, View } from "react-native"
import { ReactElement } from "react"
import { Link } from "@/components/Link"

export function AppointmentHistoryHeader(): ReactElement {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-white font-semibold text-base">Histórico de Consultas</Text>

      <Link text="Ver todo histórico" />
    </View>
  )
}
