import { ElementType } from "react"
import { View } from "react-native"
import tailwindConfig from "../../../tailwind.config"

interface InputIconProps {
  icon: ElementType
  hasError?: boolean
}

export const TextInputIcon = ({ icon: Icon, hasError }: InputIconProps) => {
  const defaultColor = tailwindConfig.theme.extend.colors.primary[300]
  const errorColor = tailwindConfig.theme.extend.colors.angry[500]
  const color = hasError ? errorColor : defaultColor

  return (
    <View className="w-6 h-6 justify-center items-center">
      <Icon color={color} />
    </View>
  )
}
