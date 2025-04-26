import { Text, TouchableOpacity, View } from "react-native"
import { Calendar, CalendarCheck, Home, Settings, User } from "lucide-react-native"
import { ReactElement } from "react"

export type RoleType = "PROFESSIONAL" | "PATIENT"

interface NavigationBarProps {
  role: RoleType
}

export const NavigationBar = ({ role }: NavigationBarProps): ReactElement => {
  const menuItems = [
    { icon: Calendar, label: "Consultas", isHome: false, isActive: false, screen: "Appointments" },
    {
      icon: User,
      label: role === "PROFESSIONAL" ? "Pacientes" : "Perfil",
      isHome: false,
      isActive: false,
      screen: role === "PROFESSIONAL" ? "Patients" : "Profile",
    },
    { icon: Home, label: "Início", isHome: true, isActive: true, screen: "Home" },
    { icon: CalendarCheck, label: "Agenda", isHome: false, isActive: false, screen: "Agenda" },
    { icon: Settings, label: "Configurações", isHome: false, isActive: false, screen: "Settings" },
  ]

  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-neutral-200 p-3 shadow-md">
      {menuItems.map((item, index) => {
        const isActive = item.isActive

        return (
          <TouchableOpacity
            key={index}
            className={`items-center ${item.isHome ? "mt-[-12px]" : ""}`}
            onPress={() => undefined}
          >
            <item.icon
              size={item.isHome ? 32 : 24}
              color={isActive ? "#5BB6FF" : "#8A8A8A"} // primary-400 for active, neutral-600 for inactive
            />

            {!item.isHome && (
              <Text
                className={`text-xs mt-1 ${isActive ? "text-primary-400" : "text-neutral-600"}`}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
