import { Bell, User as UserIcon } from "lucide-react-native"
import { ReactElement } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useStores } from "@/models"
import { User } from "@/models/User"
import tailwind from "./../../../tailwind.config"
import { useNavigation } from "@react-navigation/native"

export const HomeHeader = (): ReactElement => {
  const { user } = useStores().userStore as { user: User }

  const navigation = useNavigation()
  const colors = tailwind.theme.extend.colors

  return (
    <View className="flex-col px-4 pt-6 pb-4 gap-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />

          <Text className="text-white text-lg font-semibold">Oi, {user.name} 👋</Text>
        </View>

        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            className="relative"
          >
            <Bell color={colors.neutral[900]} className="w-5 h-5" />

            <View className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            className="active:opacity-70"
          >
            <View className="w-8 h-8 rounded-full bg-neutral-300 items-center justify-center">
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-8 h-8 rounded-full border border-neutral-400"
                />
              ) : (
                <UserIcon size={20} color="#8A8A8A" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
