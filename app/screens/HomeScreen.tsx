import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ScrollView } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList } from "../navigators"
import { Header, HeaderProps } from "../components/Header/Header"
import { ServicesGrid } from "../components/ServicesGrid"
import { DepartmentsSection } from "../components/DepartamentsSection"
import { HospitalsSection } from "../components/HospitalsSection"
import { BottomNavigation } from "../components/BottomNavigation"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAppTheme } from "../utils/useAppTheme"

interface HomeScreenProps extends NativeStackScreenProps<AppStackParamList, "Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const { theme } = useAppTheme()

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const services = [
    {
      icon: "hospital-building" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Consulta\nClínica",
      color: theme.colors.tint,
    },
    {
      icon: "home" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Consulta\nDomiciliar",
      color: theme.colors.tint,
    },
    {
      icon: "video" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Consulta\nOnline",
      color: theme.colors.tint,
    },
    {
      icon: "pill" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Farmácia",
      color: theme.colors.tint,
    },
    {
      icon: "virus" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Doenças",
      color: theme.colors.tint,
    },
    {
      icon: "shield-virus" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Covid-19",
      color: theme.colors.tint,
    },
  ]

  const departments = [
    {
      icon: "doctor" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Clínica Geral",
      sessions: "123 Sessões",
      color: "#2196F3",
    },
    {
      icon: "heart-pulse" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Pediatria",
      sessions: "150 Sessões",
      color: "#FF4081",
    },
    {
      icon: "heart" as keyof typeof MaterialCommunityIcons.glyphMap,
      title: "Cardiologia",
      sessions: "98 Sessões",
      color: "#2196F3",
    },
  ]

  const hospitals = [
    {
      name: "Hospital São Lucas",
      image:
        "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.8",
      distance: "1.2 km",
    },
    {
      name: "Hospital Albert Einstein",
      image:
        "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.9",
      distance: "2.5 km",
    },
  ]

  return (
    <View className="flex-1 bg-[#FFFFFF]">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <ServicesGrid services={services} />

      <ScrollView
        className="flex-1 mt-[180px]"
        contentContainerClassName="px-4 pb-20"
        showsVerticalScrollIndicator={false}
      >
        <DepartmentsSection departments={departments} />
        <HospitalsSection hospitals={hospitals} />
      </ScrollView>

      <BottomNavigation />
    </View>
  )
})
