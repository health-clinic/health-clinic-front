import { Text, View } from "react-native"
import { CheckCircle, Info, X } from "lucide-react-native"

export const toastConfig = {
  error: ({ text1: text }: any) => (
    <View className="flex flex-row items-center gap-x-2 px-4 py-1.5 rounded-lg bg-neutral-200 shadow-lg m-4">
      <View className="flex justify-center items-center bg-angry-500 w-7 h-7 rounded-full">
        <X className="text-white text-base" />
      </View>

      <Text className="flex-shrink text-neutral-900 text-sm leading-relaxed font-interMedium">{text}</Text>
    </View>
  ),
  info: ({ text1: text }: any) => (
    <View className="flex flex-row items-center gap-x-3 px-4 py-2 rounded-full bg-neutral-200 shadow-lg m-4">
      <View className="flex justify-center items-center bg-accent-500 w-8 h-8 rounded-full">
        <Info className="text-white text-lg" />
      </View>

      <Text className="flex-shrink text-neutral-900 text-base font-interMedium leading-normal">{text}</Text>
    </View>
  ),
  success: ({ text1: text }: any) => (
    <View className="flex flex-row items-center gap-x-3 px-4 py-2 rounded-full bg-neutral-200 shadow-lg m-4">
      <View className="flex justify-center items-center bg-primary-600 w-8 h-8 rounded-full">
        <CheckCircle className="text-white text-lg" />
      </View>

      <Text className="flex-shrink text-neutral-900 text-base font-interMedium leading-normal">{text}</Text>
    </View>
  ),
}
