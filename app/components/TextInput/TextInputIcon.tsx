import { ElementType } from "react"
import { View } from "react-native"

interface InputIconProps {
  icon: ElementType
}

export const TextInputIcon = ({ icon: Icon }: InputIconProps) => {
  return (
    <View className="w-6 h-6 justify-center items-center">
      <Icon className="text-primary-300" />
    </View>
  )
}
