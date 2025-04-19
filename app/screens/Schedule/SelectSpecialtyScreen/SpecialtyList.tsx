import { ReactElement } from "react"
import { FlatList } from "react-native"
import { SpecialtyCard } from "@/screens/Schedule/SelectSpecialtyScreen/SpecialtyCard"
import { Specialty } from "@/models/Specialty"

interface SpecialtyListProps {
  onSelect: (specialty: Specialty) => void
  specialties: Specialty[]
}

export const SpecialtyList = ({ specialties, onSelect }: SpecialtyListProps): ReactElement => {
  return (
    <FlatList
      data={specialties}
      numColumns={2}
      keyExtractor={(specialty: Specialty) => specialty.id}
      renderItem={(specialty: Specialty) => (
        <SpecialtyCard specialty={specialty} onPress={onSelect} />
      )}
      columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
      contentContainerStyle={{ paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
    />
  )
}
