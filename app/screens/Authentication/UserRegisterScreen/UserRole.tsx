import { ElementType, ReactElement } from "react"
import type { PressableProps } from "react-native"
import { Pressable, Text, View } from "react-native"
// @ts-ignore
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
      className="w-[45%] aspect-square rounded-2xl bg-transparent border border-neutral-500 shadow-lg active:scale-95"
      {...props}
    >
      <View className="flex-1 flex-col items-center justify-center gap-4 p-6">
        <View className="w-16 h-16 bg-primary-50 rounded-2xl items-center justify-center">
          <Icon size={32} color={colors.primary[600]} />
        </View>

        <Text className="text-center text-neutral-800 text-base font-semibold leading-5">
          {text}
        </Text>
      </View>
    </Pressable>
  )
}
