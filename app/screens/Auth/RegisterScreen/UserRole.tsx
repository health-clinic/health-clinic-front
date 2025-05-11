import { ElementType, ReactElement } from "react"
import type { PressableProps } from "react-native"
import { Pressable, Text, View } from "react-native"
import tailwind from "./../../../../tailwind.config"

export type RoleType = "administrator" | "patient" | "professional"

interface UserRoleProps extends PressableProps {
  icon: ElementType
  text: string
}

export const UserRole = ({ icon: Icon, text, ...props }: UserRoleProps): ReactElement => {
  const colors = tailwind.theme.extend.colors

  return (
    <Pressable
      android_ripple={{ color: colors.primary[300] }}
      className="w-[45%] aspect-square border border-neutral-400 rounded-2xl bg-transparent"
      {...props}
    >
      <View className="flex-1 flex-col items-center justify-center gap-2">
        <Icon size={36} color={colors.primary[300]} />

        <Text className="text-center text-neutral-800 text-base font-medium">{text}</Text>
      </View>
    </Pressable>
  )
}
