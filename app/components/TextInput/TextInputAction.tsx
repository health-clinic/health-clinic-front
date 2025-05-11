import { ReactNode } from "react"
import type { TouchableOpacityProps } from "react-native"
import { TouchableOpacity } from "react-native"

interface InputActionProps extends TouchableOpacityProps {
  children: ReactNode
}

export const TextInputAction = ({ children, ...props }: InputActionProps) => {
  return (
    <TouchableOpacity className="w-8 h-8 justify-center items-center" {...props}>
      {children}
    </TouchableOpacity>
  )
}
