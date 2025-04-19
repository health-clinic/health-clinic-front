import type { TouchableOpacityProps } from "react-native"
import { Text, TouchableOpacity } from "react-native"
import { Specialty } from "@/models/Specialty"
import { Baby } from "lucide-react-native"

interface SpecialtyCardProps extends TouchableOpacityProps {
  specialty: Specialty
}

export const SpecialtyCard = ({ specialty, ...props }: SpecialtyCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-[48%] bg-surface rounded-2xl p-4 items-center border border-outline"
      {...props}
    >
      <Baby size={40} color="#60A5FA" strokeWidth={2} />

      <Text className="mt-3 font-semibold text-lg text-foreground text-center">
        {specialty.name}
      </Text>

      <Text className="text-sm text-muted text-center mt-1">Próxima data: 3 may</Text>
    </TouchableOpacity>
  )
}
