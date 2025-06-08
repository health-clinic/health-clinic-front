import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { FC, ReactElement } from "react"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = ({
  navigation,
}: SettingsScreenProps): ReactElement => {
  const { authenticationStore, loadingStore, userStore } = useStores()

  const logout = (): void => {
    authenticationStore.logout()
    userStore.revoke()
    navigation.reset({ index: 0, routes: [{ name: "Login" }] })
  }

  return (
    <View className="flex-1 px-4 py-6 gap-4">
      <View className="mt-auto">
        <TouchableOpacity
          className="w-full items-center py-4 rounded-xl bg-red-600"
          disabled={loadingStore.isLoading}
          onPress={logout}
        >
          {loadingStore.isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-base font-bold text-neutral-900">Sair da conta</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
