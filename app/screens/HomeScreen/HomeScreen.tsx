import { AppStackScreenProps } from "@/navigators"
import { ScrollView, Text, View } from "react-native"
import { ReactElement, useEffect, useState } from "react"
import { HomeHeader } from "./HomeHeader"
import { NextAppointment } from "@/screens/HomeScreen/NextAppointment"
import { CalendarDays, Folder, Pill, Plus } from "lucide-react-native"
import { QuickAction } from "./QuickAction"
import { AppointmentHistoryHeader } from "@/screens/HomeScreen/AppointmentHistoryHeader"
import { Appointment } from "@/models/Appointment"
import { AppointmentCard } from "@/screens/HomeScreen/AppointmentCard"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen = ({ navigation }: HomeScreenProps): ReactElement => {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const fetchAppointments = (): void => {
    const appointments: Appointment[] = [
      {
        id: "appt-1",
        date: new Date("2025-04-20T14:30:00"),
        status: "confirmed",
        doctor: {
          id: "doc-1",
          user: {
            id: "user-1",
            address: {
              id: "addr-1",
              zipCode: "12345-678",
              street: "Av. Paulista",
              number: "1000",
              district: "Bela Vista",
              city: "São Paulo",
              state: "SP",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            name: "Dr. Ricardo Silva",
            email: "ricardo@clinic.com",
            phone: "11912345678",
            birthdate: "1980-05-20",
            document: "12345678900",
            role: "DOCTOR",
            admin: undefined,
            doctor: undefined,
            patient: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          crm: "CRM123456",
          specialty: "Cardiologia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "appt-2",
        date: new Date("2025-03-15T09:00:00"),
        status: "completed",
        doctor: {
          id: "doc-2",
          user: {
            id: "user-2",
            address: {
              id: "addr-2",
              zipCode: "98765-432",
              street: "Rua das Flores",
              number: "200",
              district: "Centro",
              city: "Rio de Janeiro",
              state: "RJ",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            name: "Dra. Ana Paula",
            email: "ana.paula@clinic.com",
            phone: "21987654321",
            birthdate: "1985-08-10",
            document: "09876543210",
            role: "DOCTOR",
            admin: undefined,
            doctor: undefined,
            patient: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          crm: "CRM654321",
          specialty: "Dermatologia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    setAppointments(appointments)
  }

  useEffect((): void => {
    fetchAppointments()
  }, [])

  return (
    <ScrollView className="flex-1">
      <View className="mt-6 px-4">
        <HomeHeader />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mt-4"
        contentContainerClassName="flex-row justify-between gap-4"
      >
        <QuickAction icon={Plus} label="Nova consulta" highlight />
        <QuickAction icon={Folder} label="Meus dados médicos" />
        <QuickAction icon={CalendarDays} label="Calendário" />
        <QuickAction icon={Pill} label="Prescrições" />
      </ScrollView>

      <View className="mt-6 px-4">
        {appointments.length === 0 ? (
          <Text className="text-white">Nenhuma consulta agendada.</Text>
        ) : (
          <NextAppointment appointment={appointments[0]} />
        )}
      </View>

      <View className="mt-6 px-4">
        <AppointmentHistoryHeader />

        <ScrollView className="mt-2" contentContainerClassName="flex flex-col gap-4">
          {appointments.slice(0, 2).map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}
