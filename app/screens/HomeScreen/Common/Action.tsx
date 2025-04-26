import type { TouchableOpacityProps } from "react-native"
import { Text, TouchableOpacity } from "react-native"
import { ElementType } from "react"
import { cn } from "@/utils/cn"

export interface QuickActionProps extends TouchableOpacityProps {
  icon: ElementType
  label: string
  highlight?: boolean
}

export function Action({ icon: Icon, label, highlight, ...props }: QuickActionProps) {
  return (
    <TouchableOpacity
      className={cn(
        props.className,
        "w-[25%] h-24 rounded-2xl p-3 border bg-neutral-200 border-primary-400",
        highlight && "bg-primary-500 border-primary-500",
        "flex flex-col items-start justify-around",
      )}
      {...props}
    >
      <Icon size={20} className={cn(highlight ? "text-white" : "text-primary-500")} />

      <Text className="mt-3 text-left text-sm font-semibold leading-tight text-neutral-800">
        {label}
      </Text>
    </TouchableOpacity>
  )
}
