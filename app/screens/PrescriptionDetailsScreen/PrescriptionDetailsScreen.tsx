import { ReactElement } from "react"
import { ScrollView, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { PrescriptionHeader } from "@/components/PrescriptionHeader"
import { StatusBanner } from "./StatusBanner"
import { InfoSection } from "./InfoSection"

interface PrescriptionDetailsScreenProps extends AppStackScreenProps<"PrescriptionDetails"> {}

export const PrescriptionDetailsScreen = ({
  route,
}: PrescriptionDetailsScreenProps): ReactElement => {
  const { prescription } = route.params
  const isActive = new Date(prescription.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000 > Date.now()

  return (
    <View className="flex-1 bg-neutral-200">
      <PrescriptionHeader title="Detalhes da Prescrição" />

      <ScrollView className="flex-1 p-4">
        <StatusBanner prescription={prescription} isActive={isActive} />

        <InfoSection prescription={prescription} />
      </ScrollView>
    </View>
  )
}
