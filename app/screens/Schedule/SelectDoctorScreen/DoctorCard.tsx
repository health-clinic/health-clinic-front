import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { Doctor } from "@/models/Doctor"

interface DoctorCardProps extends TouchableOpacityProps {
  doctor: Doctor
}

export const DoctorCard = ({ doctor, ...props }: DoctorCardProps) => {
  return (
    <TouchableOpacity className="flex-row items-center bg-surface p-4 rounded-2xl" {...props}>
      <Image
        source="./../../../assets/images/sad-face.png"
        className="w-12 h-12 rounded-full mr-4"
        resizeMode="cover"
      />

      <View>
        <Text className="font-medium text-base text-white">{doctor.user.name}</Text>

        <Text className="text-muted text-sm">Próxima disponibilidade: 3 may</Text>
      </View>
    </TouchableOpacity>
  )
}
