import { Image, Text, View } from "react-native"

export const AuthHeader = () => {
  return (
    <View className="flex-row items-center justify-center mb-6">
      <Image
        source={require("./../../assets/images/logo.png")}
        style={{ width: 64, height: 64 }}
        resizeMode="contain"
      />

      <View className="ml-2">
        <Text className="text-3xl font-bold text-neutral-900">Postinho de Saúde</Text>
        <Text className="text-lg font-medium text-neutral-700">Cuidando da sua saúde</Text>
      </View>
    </View>
  )
}
