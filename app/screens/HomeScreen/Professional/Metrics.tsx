import { ReactElement } from "react"
import { Text, View } from "react-native"
import { Briefcase, Calendar, Clock, Star } from "lucide-react-native"

interface WorkMetricsProps {
  todayConsultations: number
  weekConsultations: number
  feedbackScore?: number
  hoursWorked: number
}

export const Metrics = ({
  todayConsultations,
  weekConsultations,
  feedbackScore,
  hoursWorked,
}: WorkMetricsProps): ReactElement => {
  return (
    <View className="px-4">
      <Text className="text-neutral-900 font-semibold text-base">Métricas</Text>

      <View className="bg-neutral-200 rounded-2xl border border-primary-500 p-3 mt-4">
        <View className="grid grid-cols-2 gap-2">
          <View className="bg-primary-500 rounded-xl p-3 items-center justify-center">
            <Clock size={24} color="white" />
            <Text className="text-white text-xl font-bold mt-1">{todayConsultations}</Text>
            <Text className="text-white text-xs text-center">Consultas hoje</Text>
          </View>

          <View className="bg-primary-500 rounded-xl p-3 items-center justify-center">
            <Calendar size={24} color="white" />
            <Text className="text-white text-xl font-bold mt-1">{weekConsultations}</Text>
            <Text className="text-white text-xs text-center">Consultas semana</Text>
          </View>

          {feedbackScore !== undefined && (
            <View className="bg-primary-500 rounded-xl p-3 items-center justify-center">
              <Star size={24} color="white" />
              <Text className="text-white text-xl font-bold mt-1">{feedbackScore.toFixed(1)}</Text>
              <Text className="text-white text-xs text-center">Avaliação</Text>
            </View>
          )}

          <View className="bg-primary-500 rounded-xl p-3 items-center justify-center">
            <Briefcase size={24} color="white" />
            <Text className="text-white text-xl font-bold mt-1">{hoursWorked}</Text>
            <Text className="text-white text-xs text-center">Horas trabalhadas</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
