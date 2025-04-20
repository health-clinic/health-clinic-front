import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Specialty } from "@/models/Specialty"
import { Baby } from "lucide-react-native"

interface SpecialtyCardProps extends TouchableOpacityProps {
  specialty: Specialty
}

export const SpecialtyCard = ({ specialty, ...props }: SpecialtyCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      className="flex-col items-center justify-center w-[48%] rounded-2xl border border-zinc-700 p-4 bg-zinc-900"
      {...props}
    >
      <Baby size={40} color="#60A5FA" strokeWidth={2} />

      <Text className="mt-3 font-semibold text-white text-lg text-center">{specialty.name}</Text>

      <Text className="text-sm text-zinc-400 text-center mt-1">Próxima data: 3 may</Text>
    </TouchableOpacity>
  )
}
