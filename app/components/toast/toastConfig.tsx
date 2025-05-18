import { Text, View } from "react-native"
import { CheckCircle, Info, X } from "lucide-react-native"
import { ReactElement } from "react"

export const toastConfig = {
  error: ({ text1: text }: any): ReactElement => (
    <View className="flex-row items-center gap-x-3 px-4 py-3 rounded-lg bg-red-50 mx-4 mt-2 shadow-md border border-red-100">
      <View className="w-7 h-7 bg-angry-500 rounded-full items-center justify-center">
        <X size={16} color="#fff" />
      </View>

      <Text className="flex-1 text-sm text-red-900 font-interMedium">{text}</Text>
    </View>
  ),

  info: ({ text1: text }: any): ReactElement => (
    <View className="flex-row items-center gap-x-3 px-4 py-3 rounded-lg bg-blue-50 mx-4 mt-2 shadow-md border border-blue-100">
      <View className="w-7 h-7 bg-blue-500 rounded-full items-center justify-center">
        <Info size={16} color="#fff" />
      </View>

      <Text className="flex-1 text-sm text-blue-900 font-interMedium">{text}</Text>
    </View>
  ),

  success: ({ text1: text }: any): ReactElement => (
    <View className="flex-row items-center gap-x-3 px-4 py-3 rounded-lg bg-green-50 mx-4 mt-2 shadow-md border border-green-100">
      <View className="w-7 h-7 bg-green-500 rounded-full items-center justify-center">
        <CheckCircle size={16} color="#fff" />
      </View>

      <Text className="flex-1 text-sm text-green-900 font-interMedium">{text}</Text>
    </View>
  ),
}
