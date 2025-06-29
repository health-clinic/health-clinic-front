import { ReactElement } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { ChevronLeft, Shield, Stethoscope, User, Users } from "lucide-react-native"
import { RoleType, UserRole } from "@/screens/Authentication/UserRegisterScreen/UserRole"
import { StepIndicator } from "@/components/StepIndicator"
import { useNavigation } from "@react-navigation/native"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"

interface SelectUserTypeFormProps {
  onNext: (role: RoleType) => void
  onBack: () => void
}

export const SelectUserRoleForm = ({ onNext, onBack }: SelectUserTypeFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login" as never)}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">Criar conta</Text>
      </View>

      <View className="flex-1 gap-6 p-4">
        <StepIndicator currentStep={1} totalSteps={5} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <Users size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Tipo de usuário</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Selecione o tipo de conta que melhor descreve seu perfil para continuar com o cadastro.
          </Text>
        </View>

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
    </View>
  )
}
