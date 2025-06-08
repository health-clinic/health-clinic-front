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
    <View className="flex-row items-center gap-4 w-full rounded-2xl border border-zinc-700 p-4 bg-zinc-900">
      <Icon className="text-primary-500" />

      <View>
        <Text className="text-zinc-400 text-sm">{label}</Text>

        <Text className="font-semibold text-white text-lg text-center">{value}</Text>
      </View>
    </View>
  )
}
