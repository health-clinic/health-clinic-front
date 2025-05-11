import type { TouchableOpacityProps } from "react-native"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { cn } from "@/utils/cn"
import { ReactNode } from "react"
import { useStores } from "@/models"

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  const { loadingStore } = useStores()

  return (
    <TouchableOpacity
      className={cn("w-full items-center py-4 rounded-xl bg-primary-600", className)}
      disabled={loadingStore.isLoading}
      {...props}
    >
      {loadingStore.isLoading ? <ActivityIndicator color="white" /> : children}
    </TouchableOpacity>
  )
}
