import { Text, TouchableOpacity, View } from "react-native"
import type { TouchableOpacityProps } from "react-native"
import { Unit } from "@/models/Unit"

interface UnitCardProps extends TouchableOpacityProps {
  unit: Unit
}

export const UnitCard = ({ unit, ...props }: UnitCardProps) => {
  return (
    <TouchableOpacity
      className="bg-surface-100 rounded-xl px-4 py-3"
      accessibilityRole="button"
      {...props}
    >
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="font-semibold text-white">{unit.name}</Text>

          <Text className="text-muted-400">Teste</Text>
        </View>

        <Text className="text-muted-400">{unit.distance}</Text>
      </View>
    </TouchableOpacity>
  )
}
