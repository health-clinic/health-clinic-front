import { FC, ReactElement } from "react"
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { ChevronRight, LogOut, Pencil, User as UserIcon } from "lucide-react-native"
import { User } from "@/models/User"
import { formatDocument, formatPhone } from "@/utils/formatters"
import { NavigationBar } from "@/screens/Common/NavigationBar"
import { toZonedDateString } from "@/utils/date/convert"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = ({
  navigation,
}: ProfileScreenProps): ReactElement => {
  const { authenticationStore, userStore } = useStores()
  const { user } = userStore as { user: User }

  const colors = tailwind.theme.extend.colors

  const logout = () => {
    authenticationStore.logout()
    navigation.navigate("Login")
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <ScrollView className="flex-1 pb-20">
        <View className="flex-1 p-6 gap-6">
          <View className="flex-row items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-neutral-300 items-center justify-center">
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-20 h-20 rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <UserIcon size={32} color="#8A8A8A" />
              )}
            </View>

            <View className="flex-1">
              <Text className="text-neutral-900 text-xl font-medium">{user?.name}</Text>
              <Text className="text-neutral-600">{user?.email}</Text>
            </View>
          </View>

          <View className="gap-4">
            <Text className="text-neutral-900 text-base font-medium">Informações Pessoais</Text>

            <View className="bg-transparent border border-neutral-500 rounded-2xl overflow-hidden">
              <View className="p-4 flex-row items-center justify-between border-b border-neutral-500">
                <View>
                  <Text className="text-neutral-600 text-sm">Data de Nascimento</Text>
                  <Text className="text-neutral-900 text-base">
                    {user?.birthdate ? toZonedDateString(user.birthdate) : "Não informado"}
                  </Text>
                </View>
              </View>

              <View className="p-4 flex-row items-center justify-between border-b border-neutral-500">
                <View>
                  <Text className="text-neutral-600 text-sm">Telefone</Text>
                  <Text className="text-neutral-900 text-base">{formatPhone(user?.phone)}</Text>
                </View>
              </View>

              <View className="p-4 flex-row items-center justify-between">
                <View>
                  <Text className="text-neutral-600 text-sm">Documento</Text>
                  <Text className="text-neutral-900 text-base">
                    {formatDocument(user?.document)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="gap-4">
            <Text className="text-neutral-900 text-base font-medium">Configurações</Text>

            <View className="bg-transparent border border-neutral-500 rounded-2xl overflow-hidden">
              <Pressable
                className="p-4 flex-row items-center justify-between active:bg-neutral-300"
                onPress={logout}
              >
                <View className="flex-row items-center gap-3">
                  <LogOut size={20} color="#8A8A8A" />

                  <Text className="text-neutral-900 text-base">Sair</Text>
                </View>

                <ChevronRight size={20} color="#8A8A8A" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <NavigationBar />

      <TouchableOpacity
        onPress={() => navigation.navigate("Register", { user })}
        className="absolute bottom-24 right-6 bg-primary-500 h-14 w-14 rounded-full items-center justify-center shadow-lg active:opacity-70"
      >
        <Pencil size={24} color={colors.neutral[900]} />
      </TouchableOpacity>
    </View>
  )
}
