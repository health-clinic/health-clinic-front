import { Text, View } from "react-native"
import { CheckCircle, Info, X } from "lucide-react-native"

export const toastConfig = {
  error: ({ text1: text }: any) => (
    <View className="flex-row items-center gap-x-3 px-4 py-3 rounded-lg bg-neutral-200 mx-4 mt-2 shadow-md">
      <View className="w-7 h-7 bg-angry-500 rounded-full items-center justify-center">
        <X size={16} color="#fff" />
      </View>

      <Text className="flex-1 text-sm text-neutral-900 font-interMedium">{text}</Text>
    </View>
  ),

  info: ({ text1: text }: any) => (
    <View className="flex-row items-center gap-x-3 px-4 py-3 rounded-lg bg-neutral-200 mx-4 mt-2 shadow-md">
      <View className="w-7 h-7 bg-accent-500 rounded-full items-center justify-center">
        <Info size={16} color="#fff" />
      </View>

      <Text className="flex-1 text-sm text-neutral-900 font-interMedium">{text}</Text>
    </View>
  ),

  success: ({ text1: text }: any) => (
    <View className="flex-row items-center gap-x-3 px-4 py-3 rounded-lg bg-neutral-200 mx-4 mt-2 shadow-md">
      <View className="w-7 h-7 bg-primary-600 rounded-full items-center justify-center">
        <CheckCircle size={16} color="#fff" />
      </View>

      <Text className="flex-1 text-sm text-neutral-900 font-interMedium">{text}</Text>
    </View>
  ),
}
