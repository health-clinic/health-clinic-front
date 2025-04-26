import { ReactElement } from "react"
import { Appointment } from "@/models/Appointment"
import { ScrollView, Text, View } from "react-native"

interface DailyAppointmentsProps {
  appointments: Appointment[]
}

export const DailyAppointments = ({ appointments }: DailyAppointmentsProps): ReactElement => {
  return (
    <View className="gap-4">
      <Text className="px-4 text-white font-semibold text-base">Agenda de hoje</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
        contentContainerClassName="flex-row gap-4"
      >
        {appointments.map(
          (appointment: Appointment): ReactElement => (
            <View
              key={appointment.id}
              className="border border-primary-500 rounded-2xl p-4 bg-neutral-200 w-64"
            >
              <Text className="font-semibold text-neutral-900 text-lg">
                {appointment.patient.user.name}
              </Text>

              <Text className="text-neutral-600 text-sm mt-1">
                {appointment.time} · {appointment.unit.name}
              </Text>
            </View>
          ),
        )}
      </ScrollView>
    </View>
  )
}
