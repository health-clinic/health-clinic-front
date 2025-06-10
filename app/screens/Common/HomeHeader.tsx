import { Bell, User as UserIcon } from "lucide-react-native"
import { ReactElement } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useStores } from "@/models"
import { User } from "@/models/User"
import tailwind from "./../../../tailwind.config"
import { useNavigation } from "@react-navigation/native"

export const HomeHeader = (): ReactElement => {
  const { notificationStore, userStore } = useStores()
  const { user } = userStore as { user: User }

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
            className="relative h-9 w-9 items-center justify-center"
          >
            <Bell size={24} color={colors.neutral[900]} />

            {notificationStore.unreadCount > 0 && (
              <View className="h-2.5 w-2.5 rounded-full bg-primary-500 absolute top-1.5 right-1.5" />
            )}
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
