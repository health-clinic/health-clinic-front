import { ElementType, ReactElement } from "react"
import { Text, View } from "react-native"

interface AppointmentDetailItemProps {
  icon: ElementType
  label: string
  value: string
}

export const AppointmentDetailItem = ({
  icon: Icon,
  label,
  value,
}: AppointmentDetailItemProps): ReactElement => {
  return (
    <View className="flex-row items-center bg-surface rounded-xl px-4 py-3">
      <Icon className="mr-4" />

      <View>
        <Text className="text-muted text-xs">{label}</Text>

        <Text className="text-white font-medium">{value}</Text>
      </View>
    </View>
  )
}
