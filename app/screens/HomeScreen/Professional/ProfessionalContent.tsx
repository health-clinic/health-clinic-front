import { ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { Action } from "@/screens/HomeScreen/Common/Action"
import { CalendarDays, Folder, Phone, StickyNote } from "lucide-react-native"
import { NextAppointment } from "@/screens/HomeScreen/Professional/NextAppointment"
import { Appointment } from "@/models/Appointment"
import { DailyAppointments } from "@/screens/HomeScreen/Professional/DailyAppointments"
import { RecentPatients } from "./RecentPatients"
import { Patient } from "@/models/Patient"
import { Metrics } from "@/screens/HomeScreen/Professional/Metrics"

export const ProfessionalContent = (): ReactElement => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [recentPatients, setRecentPatients] = useState<Patient[]>([])

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
        prescriptions: [
          {
            id: 1,
            name: "Amoxicilina",
            dosage: "500 mg",
            frequency: "3 vezes por dia",
            duration: "7 dias",
            created_at: "2025-04-16T09:00:00Z",
            updated_at: "2025-04-16T09:00:00Z",
          },
          {
            id: 2,
            name: "Ibuprofeno",
            dosage: "400 mg",
            frequency: "2 vezes por dia",
            duration: "5 dias",
            created_at: "2025-04-16T09:00:00Z",
            updated_at: "2025-04-16T09:00:00Z",
          },
        ],
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

  const fetchRecentPatients = (): void => {
    const recentPatients: Patient[] = [
      {
        id: 1,
        cns: "123456789012345",
        lastVisit: "2025-04-20T14:30:00.000Z",
        note: "Paciente com histórico de hipertensão. Monitorar pressão semanalmente.",
        tags: ["Hipertensão", "Acompanhamento"],
        createdAt: "2023-05-12T10:00:00.000Z",
        updatedAt: "2025-04-20T14:31:00.000Z",
        user: {
          id: 101,
          name: "Ana Costa",
          email: "ana.costa@example.com",
          avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          phone: "+55 11 91234-5678",
          birthdate: "1985-09-15T00:00:00.000Z",
          document: "123.456.789-00",
          address: 201,
          role: "PATIENT",
          createdAt: "2023-05-12T10:00:00.000Z",
          updatedAt: "2025-04-20T14:31:00.000Z",
        },
      },
      {
        id: 2,
        cns: "987654321098765",
        lastVisit: "2025-04-18T09:00:00.000Z",
        note: "Paciente gestante. Próxima consulta pré-natal em 30/04.",
        tags: ["Pré-natal", "Urgente"],
        createdAt: "2024-07-01T08:45:00.000Z",
        updatedAt: "2025-04-18T09:15:00.000Z",
        user: {
          id: 102,
          name: "Maria Silva",
          email: "maria.silva@example.com",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          phone: "+55 21 99876-5432",
          birthdate: "1992-03-10T00:00:00.000Z",
          document: "987.654.321-00",
          address: 202,
          role: "PATIENT",
          createdAt: "2024-07-01T08:45:00.000Z",
          updatedAt: "2025-04-18T09:15:00.000Z",
        },
      },
      {
        id: 3,
        cns: "135792468024680",
        lastVisit: null,
        note: null,
        tags: [],
        createdAt: "2025-01-10T11:20:00.000Z",
        updatedAt: "2025-04-15T11:30:00.000Z",
        user: {
          id: 103,
          name: "João Mendes",
          email: "joao.mendes@example.com",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          phone: "+55 31 97654-3210",
          birthdate: "1978-11-02T00:00:00.000Z",
          document: "321.654.987-00",
          address: 203,
          role: "PATIENT",
          createdAt: "2025-01-10T11:20:00.000Z",
          updatedAt: "2025-04-15T11:30:00.000Z",
        },
      },
    ]

    setRecentPatients(recentPatients)
  }

  useEffect((): void => {
    fetchAppointments()
    fetchRecentPatients()
  }, [])

  return (
    <View className="flex flex-col gap-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mt-4"
        contentContainerClassName="flex-row gap-2"
      >
        <Action icon={CalendarDays} label="Agenda completa" />
        <Action icon={StickyNote} label="Nova nota" />
        <Action icon={Folder} label="Prontuários" />
        <Action icon={Phone} label="Suporte" />
      </ScrollView>

      <View className="px-4">
        {appointments.length === 0 ? (
          <Text className="text-white">Nenhuma consulta agendada.</Text>
        ) : (
          <NextAppointment appointment={appointments[0]} />
        )}
      </View>

      <DailyAppointments appointments={appointments.slice(1)} />

      <RecentPatients patients={recentPatients} />

      <Metrics todayConsultations={1} weekConsultations={4} feedbackScore={4.56} hoursWorked={4} />
    </View>
  )
}
