import { FC, Fragment, ReactElement } from "react"
import { ScrollView, View, Text } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { PrescriptionHeader } from "@/components/PrescriptionHeader"
import { Prescription } from "@/models/Prescription"
import { AlertCircle, Calendar, Clock } from "lucide-react-native"
import { isWithinInterval, addDays } from "date-fns"

interface PrescriptionDetailsScreenProps extends AppStackScreenProps<"PrescriptionDetails"> {}

export const PrescriptionDetailsScreen: FC<PrescriptionDetailsScreenProps> = ({
  route,
}: PrescriptionDetailsScreenProps): ReactElement => {
  const { prescription } = route.params as { prescription: Prescription }
  const now = new Date()

  const scheduledFor = prescription.appointment.scheduledFor
  const durationDays = parseInt(prescription.duration)
  const endDate = addDays(scheduledFor, durationDays)

  const isActive = isWithinInterval(now, { start: scheduledFor, end: endDate })

  return (
    <View className="flex-1 bg-neutral-200">
      <PrescriptionHeader title="Detalhes da Prescrição" />

      <ScrollView className="flex-1 p-4">
        <View className="flex flex-col gap-6">
          <View className={`p-4 rounded-xl ${isActive ? "bg-blue-500" : "bg-neutral-700"}`}>
            <View className="flex flex-col gap-1">
              <Text className="text-white text-lg font-bold">
                {isActive ? "Prescrição Ativa" : "Prescrição Finalizada"}
              </Text>

              {isActive && (
                <Text className="text-white text-sm">
                  Válida por mais{" "}
                  {Math.ceil((endDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))} dias
                </Text>
              )}
            </View>
          </View>

          <Fragment>
            <View className="bg-transparent border border-neutral-500 rounded-xl p-4">
              <View className="flex flex-col gap-2">
                <Text className="text-white text-2xl font-bold">{prescription.name}</Text>

                <Text className="text-neutral-600 text-lg">{prescription.dosage}</Text>
              </View>
            </View>

            <View className="bg-transparent border border-neutral-500 rounded-xl p-4">
              <View className="flex flex-col gap-4">
                <Text className="text-white text-lg font-bold">Instruções de Uso</Text>

                <View className="flex flex-col gap-4">
                  <View className="flex-row items-center gap-2">
                    <Clock size={20} color="#8A8A8A" />

                    <Text className="text-neutral-600">{prescription.frequency}</Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Calendar size={20} color="#8A8A8A" />

                    <Text className="text-neutral-600">{prescription.duration}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="bg-transparent border border-neutral-500 rounded-xl p-4">
              <View className="flex flex-col gap-4">
                <View className="flex-row items-center gap-2">
                  <AlertCircle size={20} color="#8A8A8A" />

                  <Text className="text-white text-lg font-bold">Informações Adicionais</Text>
                </View>

                <Text className="text-neutral-600">
                  • Tome o medicamento nos horários indicados{"\n"}• Mantenha uma rotina regular
                  {"\n"}• Complete todo o tratamento, mesmo se sentir-se melhor
                </Text>
              </View>
            </View>
          </Fragment>
        </View>
      </ScrollView>
    </View>
  )
}
