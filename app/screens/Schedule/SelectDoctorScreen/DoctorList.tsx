import { ReactElement } from "react"
import { FlatList } from "react-native"
import { DoctorCard } from "@/screens/Schedule/SelectDoctorScreen/DoctorCard"
import { Doctor } from "@/models/Doctor"

interface DoctorListProps {
  onSelect: (doctor: Doctor) => void
  doctors: Doctor[]
}

export const DoctorList = ({ doctors, onSelect }: DoctorListProps): ReactElement => {
  return (
    <FlatList
      data={doctors}
      keyExtractor={(doctor: Doctor) => doctor.id}
      renderItem={(doctor: Doctor) => <DoctorCard doctor={doctor} onPress={onSelect} />}
      contentContainerStyle={{ gap: 12 }}
      showsVerticalScrollIndicator={false}
    />
  )
}
