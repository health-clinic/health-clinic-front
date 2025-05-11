import type { TouchableOpacityProps } from "react-native"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { Professional } from "@/models/Professional"

interface ProfessionalCardProps extends TouchableOpacityProps {
  professional: Professional
}

export const ProfessionalCard = ({ professional, ...props }: ProfessionalCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      className="flex-row items-center w-full rounded-2xl border border-zinc-700 p-6 bg-zinc-900"
      {...props}
    >
      <Image
        className="rounded-full mr-4"
        source={professional.user.avatar}
        style={{ width: 64, height: 64 }}
        resizeMode="cover"
      />

      <View className="flex-col items-start gap-2">
        <Text className="font-medium text-base text-white">{professional.user.name}</Text>

        <Text className="text-sm text-zinc-400 text-sm">Próxima disponibilidade: 3 may</Text>
      </View>
    </TouchableOpacity>
  )
}
