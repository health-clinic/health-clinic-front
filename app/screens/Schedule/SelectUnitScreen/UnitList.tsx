import { ReactElement } from "react"
import { Unit } from "@/models/Unit"
import { FlatList } from "react-native"
import { UnitCard } from "@/screens/Schedule/SelectUnitScreen/UnitCard"

interface UnitListProps {
  onSelect: (unit: Unit) => void
  units: Unit[]
}

export const UnitList = ({ units, onSelect }: UnitListProps): ReactElement => {
  return (
    <FlatList
      className="gap-12 pb-24"
      data={units}
      keyExtractor={(unit: Unit) => unit.id}
      renderItem={(unit: Unit) => <UnitCard onPress={onSelect} unit={unit} />}
      showsVerticalScrollIndicator={false}
    />
  )
}
