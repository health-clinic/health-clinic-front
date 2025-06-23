import type { TouchableOpacityProps } from "react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { ElementType } from "react"
import { cn } from "@/utils/cn"
import tailwind from "./../../../tailwind.config"

export interface QuickActionProps extends TouchableOpacityProps {
  icon: ElementType
  label: string
  highlight?: boolean
}

export function Action({ icon: Icon, label, highlight, className, ...props }: QuickActionProps) {
  const colors = tailwind.theme.extend.colors

  return (
    <TouchableOpacity
      className={cn(
        "w-32 h-24 rounded-2xl p-3 border border-neutral-500",
        highlight && "bg-primary-500 border-primary-500",
        "flex flex-col items-start justify-around",
        className,
      )}
      {...props}
    >
      <Icon size={20} color={cn(highlight ? colors.neutral[900] : colors.primary[500])} />

      <Text className="mt-3 text-left text-sm font-semibold leading-tight text-neutral-900">
        {label}
      </Text>
    </TouchableOpacity>
  )
}
