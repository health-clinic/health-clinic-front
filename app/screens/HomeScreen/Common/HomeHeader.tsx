import { Bell } from "lucide-react-native"
import { ReactElement } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useStores } from "@/models"
import { User } from "@/models/User"

export const HomeHeader = (): ReactElement => {
  const { user } = useStores().userStore as { user: User }

  return (
    <View className="px-4 pt-6 pb-4 bg-primary">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-3">
          <Image
            source={require("../../../../assets/images/logo.png")}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
          <Text className="text-white text-lg font-semibold">Oi, {user.name} 👋</Text>
        </View>

        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="relative">
            <Bell className="w-5 h-5 text-white" />
            <View className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              className="rounded-full"
              source={user.avatar}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
