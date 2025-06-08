import type { TouchableOpacityProps } from "react-native"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { Professional } from "@/models/Professional"
import { User as UserIcon } from "lucide-react-native"

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
      <View className="w-16 h-16 rounded-full bg-neutral-300 items-center justify-center mr-4">
        {professional.user.avatar ? (
          <Image
            className="w-16 h-16 rounded-full"
            source={{ uri: professional.user.avatar }}
            resizeMode="cover"
          />
        ) : (
          <UserIcon size={32} color="#8A8A8A" />
        )}
      </View>

      <View className="flex-col items-start gap-2">
        <Text className="font-medium text-base text-white">{professional.user.name}</Text>

        <Text className="text-sm text-zinc-400 text-sm">Próxima disponibilidade: 3 may</Text>
      </View>
    </TouchableOpacity>
  )
}
