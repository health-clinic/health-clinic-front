import { ScrollView, View } from "react-native"
import { ReactElement } from "react"
import { HomeHeader } from "./Common/HomeHeader"
import { useStores } from "@/models"
import { PatientContent } from "@/screens/HomeScreen/Patient/PatientContent"
import { ProfessionalContent } from "@/screens/HomeScreen/Professional/ProfessionalContent"
import { NavigationBar, RoleType } from "@/screens/HomeScreen/Common/NavigationBar"
import { User } from "@/models/User"

export const HomeScreen = (): ReactElement => {
  const { user } = useStores().userStore as { user: User }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-2 shadow-md">
        <HomeHeader />
      </View>

      <ScrollView contentContainerClassName="pb-32" showsVerticalScrollIndicator={false}>
        {user.isPatient() && <PatientContent />}

        {user.isProfessional() && <ProfessionalContent />}
      </ScrollView>

      <NavigationBar role={user.role as RoleType} />
    </View>
  )
}
