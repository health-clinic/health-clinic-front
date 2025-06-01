import { FC, ReactElement } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"

interface TabsItemProps extends TouchableOpacityProps {
  label: string
  isSelected?: boolean
  badgeCount?: number
  onPress?: () => void
}

export const TabsItem: FC<TabsItemProps> = ({
  label,
  isSelected = false,
  badgeCount,
  ...props
}: TabsItemProps): ReactElement => {
  return (
    <TouchableOpacity
      className={`px-6 py-3 rounded-full ${isSelected ? "bg-primary-500" : "bg-transparent"}`}
      activeOpacity={0.7}
      {...props}
    >
      <View className="flex-row items-center">
        <Text className={`text-lg font-medium ${isSelected ? "text-white" : "text-neutral-500"}`}>
          {label}
        </Text>

        {badgeCount !== undefined && badgeCount > 0 && (
          <View className="ml-2 bg-blue-500 rounded-full px-2 py-0.5">
            <Text className="text-xs text-white font-medium">{badgeCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
