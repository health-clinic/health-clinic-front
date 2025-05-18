import { Text, TouchableOpacity, View } from "react-native"
import { CalendarCheck, Home, Pill, Settings } from "lucide-react-native"
import { ReactElement } from "react"
import { useNavigation } from "@react-navigation/native"

export type RoleType = "PROFESSIONAL" | "PATIENT"

interface NavigationBarProps {
  role: RoleType
}

export const NavigationBar = ({ role }: NavigationBarProps): ReactElement => {
  const navigation = useNavigation()

  const menuItems = [
    { icon: Home, label: "Início", isHome: true, isActive: true, screen: "Home" },
    { icon: CalendarCheck, label: "Agenda", isHome: false, isActive: false, screen: "Agenda" },
    { icon: Pill, label: "Prescrições", isHome: false, isActive: false, screen: "Prescriptions" },
    { icon: Settings, label: "Configurações", isHome: false, isActive: false, screen: "Settings" },
  ]

  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-neutral-200 p-3 shadow-md">
      {menuItems.map((item, index) => {
        const isActive = item.isActive

        return (
          <TouchableOpacity
            key={index}
            className="items-center"
            onPress={() => navigation.navigate(item.screen)}
          >
            <item.icon size={24} color={isActive ? "#5BB6FF" : "#8A8A8A"} />

            <Text className={`text-xs mt-1 ${isActive ? "text-primary-400" : "text-neutral-600"}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
