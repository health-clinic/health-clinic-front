import { Text, TouchableOpacity, View } from "react-native"
import type { TouchableOpacityProps } from "react-native"
import { Unit } from "@/models/Unit"

interface UnitCardProps extends TouchableOpacityProps {
  unit: Unit
}

export const UnitCard = ({ unit, ...props }: UnitCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      className="w-full rounded-2xl border border-zinc-700 p-4 space-y-2 bg-zinc-900"
      {...props}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1 p-2">
          <Text className="font-semibold text-white text-base">{unit.name}</Text>

          <View className="flex-row justify-between">
            <Text className="text-zinc-400 text-sm">
              {unit.address?.street || "Endereço não informado"}
            </Text>

            <Text className="text-zinc-400 text-sm">{unit.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
