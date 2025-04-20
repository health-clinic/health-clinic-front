import type { TouchableOpacityProps } from "react-native"
import { Text, TouchableOpacity } from "react-native"
import { ElementType } from "react"
import { cn } from "@/utils/cn"

export interface QuickActionProps extends TouchableOpacityProps {
  icon: ElementType
  label: string
  highlight?: boolean
}

export function QuickAction({ icon: Icon, label, highlight, ...props }: QuickActionProps) {
  return (
    <TouchableOpacity
      className={cn(
        props.className,
        "w-28 h-28 flex-col items-start justify-center rounded-3xl p-4 border",
        highlight ? "bg-primary-500 " : "bg-zinc-900 border-zinc-700",
      )}
      {...props}
    >
      <Icon size={24} className={cn(highlight ? "text-white" : "text-primary-300")} />

      <Text className={cn("mt-2 text-sm font-medium", highlight ? "text-white" : "text-white")}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}
