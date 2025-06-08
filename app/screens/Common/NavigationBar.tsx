import { Text, TouchableOpacity, View } from "react-native"
import { Home } from "lucide-react-native"
import { ReactElement } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators"

type NavigationProp = NativeStackNavigationProp<AppStackParamList>

export const NavigationBar = (): ReactElement => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-neutral-200 p-3 shadow-md">
      <TouchableOpacity
        className="items-center mx-auto"
        onPress={() => navigation.navigate("Home")}
      >
        <Home size={24} color="#5BB6FF" />

        <Text className="text-xs mt-1 text-primary-400">Início</Text>
      </TouchableOpacity>
    </View>
  )
}
