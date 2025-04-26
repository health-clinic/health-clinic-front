import { TouchableOpacity, ActivityIndicator } from "react-native"
import type { TouchableOpacityProps } from "react-native"
import { cn } from "@/utils/cn"
import { ReactNode } from "react"

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
  children: ReactNode
}

export const Button = ({ isLoading, children, className, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("w-full items-center py-4 rounded-xl bg-primary-600", className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ActivityIndicator className="text-neutral-900" /> : children}
    </TouchableOpacity>
  )
}
