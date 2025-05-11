import { ReactElement } from "react"
import { Text, View } from "react-native"
import { Shield, Stethoscope, User } from "lucide-react-native"
import { RoleType, UserRole } from "@/screens/Auth/RegisterScreen/UserRole"

interface SelectUserTypeFormProps {
  onNext: (role: RoleType) => void
}

export const SelectUserRoleForm = ({ onNext }: SelectUserTypeFormProps): ReactElement => {
  return (
    <View className="flex flex-col items-center gap-4 px-4">
      <Text className="text-lg font-medium text-white text-center">Tipo de usuário</Text>

      <View className="flex-row flex-wrap justify-center gap-4">
        <UserRole icon={Shield} onPress={() => onNext("administrator")} text="Administrador" />

        <UserRole icon={User} onPress={() => onNext("patient")} text="Paciente" />

        <UserRole
          icon={Stethoscope}
          onPress={() => onNext("professional")}
          text="Professional da Sáude"
        />
      </View>
    </View>
  )
}
