import { TouchableOpacity, Text, View } from "react-native"
import { Fingerprint } from "lucide-react-native"

interface BiometricLoginButtonProps {
  onPress: () => void
}

export const BiometricLoginButton = ({ onPress }: BiometricLoginButtonProps) => {
  return (
    <View className="items-center mt-6">
      <Text className="text-neutral-800 text-base mb-4 font-medium">Ou entre com</Text>

      <TouchableOpacity
        onPress={onPress}
        className="w-18 h-18 rounded-full bg-white/5 items-center justify-center shadow-md"
        accessibilityLabel="Entrar com impressão digital"
        accessibilityRole="button"
      >
        <Fingerprint className="w-20 h-20 text-primary-500" />
      </TouchableOpacity>
    </View>
  )
}
