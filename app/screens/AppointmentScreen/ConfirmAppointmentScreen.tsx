import { ReactElement } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Diagnosis } from "@/models/Diagosis"
import { Prescription } from "@/models/Prescription"
import { Appointment } from "@/models/Appointment"

interface ConfirmAppointmentScreenProps extends AppStackScreenProps<"ConfirmAppointment"> {}

export const ConfirmAppointmentScreen = ({
  navigation,
  route,
}: ConfirmAppointmentScreenProps): ReactElement => {
  const { appointment, complaints, diagnoses, prescriptions } = route.params as {
    appointment: Appointment
    complaints?: string[]
    diagnoses?: Diagnosis[]
    prescriptions?: Prescription[]
  }

  const handleConfirmAppointment = () => {
    navigation.navigate("Home")
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-primary-500 p-4">
        <Text className="text-white font-bold text-xl text-center">Revisar Consulta</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="mb-6">
          <Text className="text-neutral-700 font-bold text-sm mb-1">Paciente:</Text>
          <Text className="text-neutral-900 text-base">
            {appointment.patient.user.name} (F, 45 anos) - ID #{appointment.patient.id}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-neutral-700 font-bold text-sm mb-1">Data:</Text>
          <Text className="text-neutral-900 text-base">{appointment.date} - Confirmado</Text>
        </View>

        <View className="mb-6">
          <Text className="text-neutral-700 font-bold text-sm mb-1">Queixas:</Text>
          {complaints?.length > 0 ? (
            complaints.map((item, index) => (
              <Text key={index} className="text-neutral-900 text-base">
                • {item}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-600 italic text-sm">Sem queixas registradas.</Text>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-neutral-700 font-bold text-sm mb-1">Diagnósticos:</Text>
          {diagnoses?.length > 0 ? (
            diagnoses.map((item, index) => (
              <Text key={index} className="text-neutral-900 text-base">
                • {item.title} ({item.code}) - {item.severity}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-600 italic text-sm">Nenhum diagnóstico adicionado.</Text>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-neutral-700 font-bold text-sm mb-1">Prescrições:</Text>
          {prescriptions?.length > 0 ? (
            prescriptions.map((item, index) => (
              <Text key={index} className="text-neutral-900 text-base">
                • {item.name} - {item.dosage} - {item.frequency} - {item.duration}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-600 italic text-sm">Nenhuma prescrição adicionada.</Text>
          )}
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View className="flex-row justify-around items-center p-4 border-t border-neutral-300 bg-neutral-100">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 mr-2 bg-neutral-300 rounded-2xl p-4 items-center"
        >
          <Text className="text-neutral-900 font-bold text-sm">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleConfirmAppointment}
          className="flex-1 ml-2 bg-primary-500 rounded-2xl p-4 items-center"
        >
          <Text className="text-white font-bold text-sm">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
