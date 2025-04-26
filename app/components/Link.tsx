import { Text, TouchableOpacity } from "react-native"
import type { TouchableOpacityProps } from "react-native"

interface LinkProps extends TouchableOpacityProps {
  text: string
}

export const Link = ({ text, ...props }: LinkProps) => {
  return (
    <TouchableOpacity accessibilityRole="link" {...props}>
      <Text className="text-sm text-primary-600 font-medium">{text}</Text>
    </TouchableOpacity>
  )
}
