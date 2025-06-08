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
  badgeCount = 0,
  ...props
}: TabsItemProps): ReactElement => {
  return (
    <TouchableOpacity
      className={`px-2 py-1 rounded-full ${
        isSelected
          ? "bg-primary-500/20 border border-primary-500/30"
          : "bg-transparent border border-neutral-300"
      }`}
      activeOpacity={0.7}
      {...props}
    >
      <View className="flex-row gap-2 items-center">
        <Text
          className={`text-sm font-medium ${isSelected ? "text-primary-500" : "text-neutral-500"}`}
        >
          {label}
        </Text>

        {badgeCount > 0 && (
          <View className="bg-primary-500/20 rounded-full px-2 py-0.5 border border-primary-500/30">
            <Text className="text-xs text-primary-500 font-medium">{badgeCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
