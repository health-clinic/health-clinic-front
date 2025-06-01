import { Fragment, ReactElement } from "react"
import { Text, View } from "react-native"
import { AlertCircle, Calendar, Clock } from "lucide-react-native"
import { Prescription } from "@/models/Prescription"

interface InfoSectionProps {
  prescription: Prescription
}

export const InfoSection = ({ prescription }: InfoSectionProps): ReactElement => {
  return (
    <Fragment>
      {/* Medication Info */}
      <View className="bg-neutral-800 rounded-xl p-4 mb-6">
        <Text className="text-white text-2xl font-bold mb-2">{prescription.name}</Text>
        <Text className="text-neutral-300 text-lg">{prescription.dosage}</Text>
      </View>

      {/* Usage Instructions */}
      <View className="bg-neutral-800 rounded-xl p-4 mb-6">
        <Text className="text-white text-lg font-bold mb-4">Instruções de Uso</Text>

        <View className="space-y-4">
          <View className="flex-row items-center">
            <Clock size={20} color="#9CA3AF" />
            <Text className="text-neutral-300 ml-2">{prescription.frequency}</Text>
          </View>

          <View className="flex-row items-center">
            <Calendar size={20} color="#9CA3AF" />
            <Text className="text-neutral-300 ml-2">{prescription.duration}</Text>
          </View>
        </View>
      </View>

      {/* Additional Info */}
      <View className="bg-neutral-800 rounded-xl p-4">
        <View className="flex-row items-center mb-4">
          <AlertCircle size={20} color="#9CA3AF" />
          <Text className="text-white text-lg font-bold ml-2">Informações Adicionais</Text>
        </View>

        <Text className="text-neutral-300">
          • Tome o medicamento nos horários indicados{"\n"}• Mantenha uma rotina regular{"\n"}•
          Complete todo o tratamento, mesmo se sentir-se melhor
        </Text>
      </View>
    </Fragment>
  )
}
