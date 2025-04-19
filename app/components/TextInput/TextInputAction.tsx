import { ReactNode } from "react"
import type { TouchableOpacityProps } from "react-native"
import { TouchableOpacity } from "react-native"

interface InputActionProps extends TouchableOpacityProps {
  children: ReactNode
}

export const TextInputAction = ({ children, ...props }: InputActionProps) => {
  return (
    <TouchableOpacity className="p-2" {...props}>
      {children}
    </TouchableOpacity>
  )
}
