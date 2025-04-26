import { ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { Action } from "@/screens/HomeScreen/Common/Action"
import { CalendarDays, Folder, Pill, Plus } from "lucide-react-native"
import { NextAppointment } from "@/screens/HomeScreen/Patient/NextAppointment"
import { AppointmentHistoryHeader } from "@/screens/HomeScreen/Patient/AppointmentHistoryHeader"
import { AppointmentCard } from "@/screens/HomeScreen/Patient/AppointmentCard"
import { Appointment } from "@/models/Appointment"
import { useNavigation } from "@react-navigation/native"

export const PatientContent = (): ReactElement => {
  const navigation = useNavigation()

  const [appointments, setAppointments] = useState<Appointment[]>([])

  const fetchAppointments = (): void => {
    const appointments: Appointment[] = [
      {
        id: 1,
        date: "2025-04-21",
        time: "09:00",
        status: "confirmed",
        created_at: "2025-04-15T10:00:00Z",
        updated_at: "2025-04-15T10:00:00Z",
        patient: {
          id: 1,
          cns: "123456789012345",
          created_at: "2025-01-01T10:00:00Z",
          updated_at: "2025-01-01T10:00:00Z",
          user: {
            id: 1,
            name: "Alice Smith",
            email: "alice@example.com",
            phone: "+5511999999999",
            birthdate: "1990-06-15T00:00:00Z",
            document: "12345678900",
            role: "PATIENT",
            created_at: "2025-01-01T10:00:00Z",
            updated_at: "2025-01-01T10:00:00Z",
            address: {
              id: 1,
              zip_code: "01001-000",
              state: "SP",
              city: "São Paulo",
              district: "Centro",
              street: "Rua A",
              number: "100",
              created_at: "2025-01-01T09:00:00Z",
              updated_at: "2025-01-01T09:00:00Z",
            },
          },
        },
        professional: {
          id: 1,
          crm: "CRM123456",
          created_at: "2025-01-01T10:00:00Z",
          updated_at: "2025-01-01T10:00:00Z",
          specialty: {
            id: 1,
            name: "Cardiology",
            created_at: "2025-01-01T08:00:00Z",
            updated_at: "2025-01-01T08:00:00Z",
          },
          unit: {
            id: 1,
            name: "Health Unit A",
            distance: "2km",
            created_at: "2025-01-01T08:30:00Z",
            updated_at: "2025-01-01T08:30:00Z",
            address: {
              id: 2,
              zip_code: "02002-000",
              state: "SP",
              city: "São Paulo",
              district: "Bela Vista",
              street: "Rua B",
              number: "200",
              created_at: "2025-01-01T08:00:00Z",
              updated_at: "2025-01-01T08:00:00Z",
            },
          },
          user: {
            id: 2,
            name: "Dr. Bruno Costa",
            email: "bruno@example.com",
            phone: "+5511988888888",
            birthdate: "1980-03-10T00:00:00Z",
            document: "98765432100",
            role: "PROFESSIONAL",
            created_at: "2025-01-01T10:00:00Z",
            updated_at: "2025-01-01T10:00:00Z",
            address: {
              id: 3,
              zip_code: "03003-000",
              state: "SP",
              city: "São Paulo",
              district: "Mooca",
              street: "Rua C",
              number: "300",
              created_at: "2025-01-01T09:00:00Z",
              updated_at: "2025-01-01T09:00:00Z",
            },
          },
        },
        unit: {
          id: 1,
          name: "Health Unit A",
          distance: "2km",
          created_at: "2025-01-01T08:30:00Z",
          updated_at: "2025-01-01T08:30:00Z",
          address: {
            id: 2,
            zip_code: "02002-000",
            state: "SP",
            city: "São Paulo",
            district: "Bela Vista",
            street: "Rua B",
            number: "200",
            created_at: "2025-01-01T08:00:00Z",
            updated_at: "2025-01-01T08:00:00Z",
          },
        },
      },
      {
        id: 2,
        date: "2025-04-22",
        time: "10:00",
        status: "pending",
        created_at: "2025-04-16T09:00:00Z",
        updated_at: "2025-04-16T09:00:00Z",
        patient: {
          id: 2,
          cns: "123456789012346",
          created_at: "2025-01-02T10:00:00Z",
          updated_at: "2025-01-02T10:00:00Z",
          user: {
            id: 3,
            name: "Carlos Lima",
            email: "carlos@example.com",
            phone: "+5511977777777",
            birthdate: "1985-09-20T00:00:00Z",
            document: "22345678900",
            role: "PATIENT",
            created_at: "2025-01-02T10:00:00Z",
            updated_at: "2025-01-02T10:00:00Z",
            address: {
              id: 4,
              zip_code: "04004-000",
              state: "SP",
              city: "São Paulo",
              district: "Itaim Bibi",
              street: "Rua D",
              number: "400",
              created_at: "2025-01-02T09:00:00Z",
              updated_at: "2025-01-02T09:00:00Z",
            },
          },
        },
        professional: {
          id: 2,
          crm: "CRM654321",
          created_at: "2025-01-02T10:00:00Z",
          updated_at: "2025-01-02T10:00:00Z",
          specialty: {
            id: 2,
            name: "Dermatology",
            created_at: "2025-01-01T08:00:00Z",
            updated_at: "2025-01-01T08:00:00Z",
          },
          unit: {
            id: 2,
            name: "Health Unit B",
            distance: "4km",
            created_at: "2025-01-02T08:30:00Z",
            updated_at: "2025-01-02T08:30:00Z",
            address: {
              id: 5,
              zip_code: "05005-000",
              state: "SP",
              city: "São Paulo",
              district: "Pinheiros",
              street: "Rua E",
              number: "500",
              created_at: "2025-01-02T08:00:00Z",
              updated_at: "2025-01-02T08:00:00Z",
            },
          },
          user: {
            id: 4,
            name: "Dr. Daniela Rocha",
            email: "daniela@example.com",
            phone: "+5511966666666",
            birthdate: "1975-02-10T00:00:00Z",
            document: "11223344556",
            role: "PROFESSIONAL",
            created_at: "2025-01-02T10:00:00Z",
            updated_at: "2025-01-02T10:00:00Z",
            address: {
              id: 6,
              zip_code: "06006-000",
              state: "SP",
              city: "São Paulo",
              district: "Liberdade",
              street: "Rua F",
              number: "600",
              created_at: "2025-01-02T09:00:00Z",
              updated_at: "2025-01-02T09:00:00Z",
            },
          },
        },
        unit: {
          id: 2,
          name: "Health Unit B",
          distance: "4km",
          created_at: "2025-01-02T08:30:00Z",
          updated_at: "2025-01-02T08:30:00Z",
          address: {
            id: 5,
            zip_code: "05005-000",
            state: "SP",
            city: "São Paulo",
            district: "Pinheiros",
            street: "Rua E",
            number: "500",
            created_at: "2025-01-02T08:00:00Z",
            updated_at: "2025-01-02T08:00:00Z",
          },
        },
      },
      {
        id: 3,
        date: "2025-04-23",
        time: "11:00",
        status: "confirmed",
        created_at: "2025-04-16T10:00:00Z",
        updated_at: "2025-04-16T10:00:00Z",
        patient: {
          id: 1,
          cns: "123456789012345",
          created_at: "2025-01-01T10:00:00Z",
          updated_at: "2025-01-01T10:00:00Z",
          user: {
            id: 1,
            name: "Alice Smith",
            email: "alice@example.com",
            phone: "+5511999999999",
            birthdate: "1990-06-15T00:00:00Z",
            document: "12345678900",
            role: "PATIENT",
            created_at: "2025-01-01T10:00:00Z",
            updated_at: "2025-01-01T10:00:00Z",
            address: {
              id: 1,
              zip_code: "01001-000",
              state: "SP",
              city: "São Paulo",
              district: "Centro",
              street: "Rua A",
              number: "100",
              created_at: "2025-01-01T09:00:00Z",
              updated_at: "2025-01-01T09:00:00Z",
            },
          },
        },
        professional: {
          id: 1,
          crm: "CRM123456",
          created_at: "2025-01-01T10:00:00Z",
          updated_at: "2025-01-01T10:00:00Z",
          specialty: {
            id: 1,
            name: "Cardiology",
            created_at: "2025-01-01T08:00:00Z",
            updated_at: "2025-01-01T08:00:00Z",
          },
          unit: {
            id: 1,
            name: "Health Unit A",
            distance: "2km",
            created_at: "2025-01-01T08:30:00Z",
            updated_at: "2025-01-01T08:30:00Z",
            address: {
              id: 2,
              zip_code: "02002-000",
              state: "SP",
              city: "São Paulo",
              district: "Bela Vista",
              street: "Rua B",
              number: "200",
              created_at: "2025-01-01T08:00:00Z",
              updated_at: "2025-01-01T08:00:00Z",
            },
          },
          user: {
            id: 2,
            name: "Dr. Bruno Costa",
            email: "bruno@example.com",
            phone: "+5511988888888",
            birthdate: "1980-03-10T00:00:00Z",
            document: "98765432100",
            role: "PROFESSIONAL",
            created_at: "2025-01-01T10:00:00Z",
            updated_at: "2025-01-01T10:00:00Z",
            address: {
              id: 3,
              zip_code: "03003-000",
              state: "SP",
              city: "São Paulo",
              district: "Mooca",
              street: "Rua C",
              number: "300",
              created_at: "2025-01-01T09:00:00Z",
              updated_at: "2025-01-01T09:00:00Z",
            },
          },
        },
        unit: {
          id: 1,
          name: "Health Unit A",
          distance: "2km",
          created_at: "2025-01-01T08:30:00Z",
          updated_at: "2025-01-01T08:30:00Z",
          address: {
            id: 2,
            zip_code: "02002-000",
            state: "SP",
            city: "São Paulo",
            district: "Bela Vista",
            street: "Rua B",
            number: "200",
            created_at: "2025-01-01T08:00:00Z",
            updated_at: "2025-01-01T08:00:00Z",
          },
        },
      },
    ]

    setAppointments(appointments)
  }

  useEffect((): void => {
    fetchAppointments()
  }, [])

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mt-4"
        contentContainerClassName="flex-row justify-between gap-4"
      >
        <Action
          icon={Plus}
          label="Nova consulta"
          highlight
          onPress={() => navigation.navigate("SelectUnit")}
        />
        <Action icon={Folder} label="Meus dados médicos" />
        <Action icon={CalendarDays} label="Calendário" />
        <Action icon={Pill} label="Prescrições" />
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
    </View>
  )
}
