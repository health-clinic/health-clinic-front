import React, { FC, ReactElement, useEffect, useState } from "react"
import { Image, Pressable, ScrollView, Text, View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import { HomeHeader } from "@/screens/Common/HomeHeader"
import { NavigationBar } from "@/screens/Common/NavigationBar"
import {
  Building2,
  CalendarDays,
  ChevronRight,
  MapPin,
  Phone,
  Plus,
  User,
  UserCog,
  Users,
} from "lucide-react-native"
import { useStores } from "@/models"
import { Unit } from "@/models/Unit"
import { Professional } from "@/models/Professional"
import { Patient } from "@/models/Patient"
import { Link } from "@/components/Link"
import { Action } from "@/screens/Common/Action"
import { api } from "@/services/api"
import { createUnitApi } from "@/services/unit/unit.api"
import { createProfessionalApi } from "@/services/professional/professional.api"
import { createPatientApi } from "@/services/patient/patient.api"
import { showErrorToast } from "@/components/toast"
import { formatPhone } from "@/utils/formatters"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

interface HomeScreenProps extends AdministratorAppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }: HomeScreenProps): ReactElement => {
  const {
    addressStore,
    appointmentStore,
    loadingStore,
    patientStore,
    professionalScheduleStore,
    professionalStore,
    unitStore,
    userStore,
  } = useStores()
  const colors = tailwind.theme.extend.colors

  const [units, setUnits] = useState<Unit[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [patients, setPatients] = useState<Patient[]>([])

  const toUnits = (data: any[]): Unit[] => {
    return data.map((unit) => {
      addressStore.set(unit.address.id, {
        id: unit.address.id,
        zipCode: unit.address.zipCode,
        state: unit.address.state,
        city: unit.address.city,
        district: unit.address.district,
        street: unit.address.street,
        number: Number(unit.address.number),
        createdAt: new Date(unit.address.createdAt),
        updatedAt: new Date(unit.address.updatedAt),
      })

      return unitStore.set(unit.id, {
        id: unit.id,
        address: unit.address.id,
        name: unit.name,
        phone: unit.phone,
        schedules: unit.schedules?.map((schedule: any) => schedule.id) || [],
        professionalSchedules:
          unit.professionalSchedules?.map((schedule: any) => schedule.id) || [],
        createdAt: new Date(unit.createdAt),
        updatedAt: new Date(unit.updatedAt),
      })
    })
  }

  const toProfessionals = (data: any[]): Professional[] => {
    return data.map((professional) => {
      console.log(professional)

      userStore.set(professional.id, {
        id: professional.id,
        address: null,
        name: professional.name,
        email: professional.email,
        avatar: null,
        phone: null,
        birthdate: null,
        document: null,
        role: "professional",
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })

      // Process schedules and extract unique units
      const scheduleIds: number[] = []
      const unitIds: number[] = []

      professional.schedules?.forEach((schedule: any) => {
        professionalScheduleStore.set(schedule.id, {
          id: schedule.id,
          professionalId: professional.id,
          unitId: schedule.unitId,
          dayOfWeek: schedule.dayOfWeek,
          start: schedule.start,
          end: schedule.end,
          createdAt: new Date(schedule.createdAt),
          updatedAt: new Date(schedule.updatedAt),
        })
        
        scheduleIds.push(schedule.id)
        
        if (schedule.unit && !unitIds.includes(schedule.unitId)) {
          unitIds.push(schedule.unitId)
          
          if (schedule.unit.address) {
            addressStore.set(schedule.unit.address.id, {
              id: schedule.unit.address.id,
              zipCode: schedule.unit.address.zipCode,
              state: schedule.unit.address.state,
              city: schedule.unit.address.city,
              district: schedule.unit.address.district,
              street: schedule.unit.address.street,
              number: Number(schedule.unit.address.number),
              createdAt: new Date(schedule.unit.address.createdAt),
              updatedAt: new Date(schedule.unit.address.updatedAt),
            })
          }

          unitStore.set(schedule.unit.id, {
            id: schedule.unit.id,
            address: schedule.unit.address?.id || null,
            name: schedule.unit.name,
            phone: schedule.unit.phone,
            schedules: [],
            professionalSchedules: [],
            createdAt: new Date(schedule.unit.createdAt),
            updatedAt: new Date(schedule.unit.updatedAt),
          })
        }
      })

      return professionalStore.set(professional.id, {
        id: professional.id,
        specialty: professional.specialty,
        unit: null,
        user: professional.id,
        crm: professional.crm || "CRM-" + professional.id,
        schedules: scheduleIds,
        units: unitIds,
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })
    })
  }

  const toPatients = (data: any[]): Patient[] => {
    return data.map((patient) => {
      if (patient.address) {
        addressStore.set(patient.address.id, {
          id: patient.address.id,
          zipCode: patient.address.zipCode,
          state: patient.address.state,
          city: patient.address.city,
          district: patient.address.district,
          street: patient.address.street,
          number: Number(patient.address.number),
          createdAt: new Date(patient.address.createdAt),
          updatedAt: new Date(patient.address.updatedAt),
        })
      }

      userStore.set(patient.id, {
        id: patient.id,
        address: patient.address?.id || null,
        name: patient.name,
        email: patient.email,
        avatar: null,
        phone: patient.phone || "",
        birthdate: patient.birthdate ? new Date(patient.birthdate) : null,
        document: patient.document || "",
        role: "patient",
        createdAt: new Date(patient.createdAt),
        updatedAt: new Date(patient.updatedAt),
      })

      return patientStore.set(patient.id, {
        id: patient.id,
        user: patient.id,
        cns: "",
        lastVisit: patient.lastVisit ? new Date(patient.lastVisit) : null,
        note: "",
        tags: [],
        createdAt: new Date(patient.createdAt),
        updatedAt: new Date(patient.updatedAt),
      })
    })
  }

  const fetchUnits = async (): Promise<void> => {
    try {
      const response = await createUnitApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast("Erro ao carregar unidades")

        return
      }

      setUnits(toUnits(response.units))
    } catch (error) {
      console.error("Error fetching units:", error)

      showErrorToast("Erro inesperado ao carregar unidades")
    }
  }

  const fetchProfessionals = async (): Promise<void> => {
    try {
      const response = await createProfessionalApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast("Erro ao carregar profissionais")

        return
      }

      setProfessionals(toProfessionals(response.professionals))
    } catch (error) {
      console.error("Error fetching professionals:", error)

      showErrorToast("Erro inesperado ao carregar profissionais")
    }
  }

  const fetchPatients = async (): Promise<void> => {
    try {
      const response = await createPatientApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast("Erro ao carregar pacientes")

        return
      }
      setPatients(toPatients(response.patients))
    } catch (error) {
      console.error("Error fetching patients:", error)

      showErrorToast("Erro inesperado ao carregar pacientes")
    }
  }

  useEffect(() => {
    loadingStore.setLoading(true)

    Promise.all([fetchUnits(), fetchProfessionals(), fetchPatients()]).finally(() =>
      loadingStore.setLoading(false),
    )
  }, [])

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-2 shadow-md">
        <HomeHeader />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 flex-col gap-6 pb-32">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="flex-row gap-4 pl-4 pr-16 mt-4"
          >
            <Action
              icon={Plus}
              label="Cadastrar unidade"
              highlight={true}
              onPress={() => navigation.navigate("UnitRegister")}
            />
          </ScrollView>

          <View className="px-4">
            <Text className="text-lg font-semibold text-neutral-900 mb-4">Visão Geral</Text>

            <View className="flex-row gap-4 mb-4">
              <View className="flex-1 bg-transparent border border-neutral-500 rounded-2xl p-4 shadow-sm">
                <View className="flex-row items-center gap-3">
                  <View className="p-2 rounded-lg bg-neutral-300">
                    <Building2 size={20} color={colors.neutral[500]} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm text-neutral-700">Unidades</Text>

                    <Text className="text-lg font-semibold text-neutral-900">
                      {unitStore.total}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-1 bg-transparent border border-neutral-500 rounded-2xl p-4 shadow-sm">
                <View className="flex-row items-center gap-3">
                  <View className="p-2 rounded-lg bg-neutral-300">
                    <UserCog size={20} color={colors.neutral[500]} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm text-neutral-700">Profissionais</Text>

                    <Text className="text-lg font-semibold text-neutral-900">
                      {professionalStore.total}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1 bg-transparent border border-neutral-500 rounded-2xl p-4 shadow-sm">
                <View className="flex-row items-center gap-3">
                  <View className="p-2 rounded-lg bg-neutral-300">
                    <Users size={20} color={colors.neutral[500]} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm text-neutral-700">Pacientes</Text>

                    <Text className="text-lg font-semibold text-neutral-900">
                      {patientStore.total}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-1 bg-transparent border border-neutral-500 rounded-2xl p-4 shadow-sm">
                <View className="flex-row items-center gap-3">
                  <View className="p-2 rounded-lg bg-neutral-300">
                    <CalendarDays size={20} color={colors.neutral[500]} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm text-neutral-700">Consultas</Text>

                    <Text className="text-lg font-semibold text-neutral-900">
                      {appointmentStore.total}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {units.length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-neutral-900">Unidades</Text>

                <Link
                  text="Ver todas as unidades"
                  onPress={() => navigation.navigate("UnitList")}
                />
              </View>

              {units.map((unit) => (
                <Pressable
                  key={unit.id}
                  onPress={() => navigation.navigate("UnitDetails", { unit })}
                  className="border border-neutral-500 rounded-2xl p-4 active:opacity-70"
                >
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                      <Building2 size={20} color={colors.neutral[500]} />
                    </View>

                    <View className="flex-1">
                      <Text className="text-neutral-900 font-semibold text-base">{unit.name}</Text>

                      <View className="flex-row items-center mt-1">
                        <Phone size={14} color={colors.primary[500]} />

                        <Text className="text-neutral-600 text-sm ml-1">
                          {formatPhone(unit.phone)}
                        </Text>
                      </View>

                      <View className="flex-row items-center mt-1">
                        <MapPin size={14} color={colors.primary[500]} />

                        <Text className="text-neutral-600 text-sm ml-1">
                          {unit.address?.city}, {unit.address?.state}
                        </Text>
                      </View>
                    </View>

                    <View className="justify-center ml-2">
                      <ChevronRight size={20} color={colors.neutral[400]} />
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="px-4 gap-4">
              <Text className="text-lg font-semibold text-neutral-900">Unidades</Text>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-900 font-medium text-base text-center">
                  Nenhuma unidade cadastrada
                </Text>

                <Text className="text-neutral-600 text-center mt-2">
                  Comece cadastrando sua primeira unidade de saúde para gerenciar o sistema.
                </Text>
              </View>
            </View>
          )}

          {professionals.length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-neutral-900">Profissionais</Text>

                <Link
                  text="Ver todos os profissionais"
                  onPress={() => navigation.navigate("ProfessionalList")}
                />
              </View>

              {professionals.map((professional) => (
                <Pressable
                  key={professional.id}
                  onPress={() => navigation.navigate("ProfessionalDetails", { professional })}
                  className="border border-neutral-500 rounded-2xl overflow-hidden active:opacity-70"
                >
                  <View className="h-1 bg-blue-500" />

                  <View className="p-4">
                    <View className="flex-row items-center">
                      <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                        {professional.user?.avatar ? (
                          <Image
                            source={{ uri: professional.user.avatar }}
                            className="w-12 h-12 rounded-full border border-neutral-400"
                          />
                        ) : (
                          <User size={20} color={colors.neutral[500]} />
                        )}
                      </View>

                      <View className="flex-1">
                        <Text className="text-neutral-900 font-semibold text-base">
                          {professional.user.name}
                        </Text>

                        <Text className="text-neutral-600 text-sm">{professional.specialty}</Text>

                        <Text className="text-neutral-500 text-xs mt-1">
                          CRM: {professional.crm}
                        </Text>
                      </View>

                      <View className="justify-center ml-2">
                        <ChevronRight size={20} color={colors.neutral[400]} />
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="px-4 gap-4">
              <Text className="text-lg font-semibold text-neutral-900">Profissionais</Text>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-900 font-medium text-base text-center">
                  Nenhum profissional cadastrado
                </Text>

                <Text className="text-neutral-600 text-center mt-2">
                  Os profissionais aparecerão aqui conforme se cadastrarem no sistema.
                </Text>
              </View>
            </View>
          )}

          {patients.length > 0 ? (
            <View className="px-4 gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-neutral-900">Pacientes</Text>

                <Link
                  text="Ver todos os pacientes"
                  onPress={() => navigation.navigate("Patients")}
                />
              </View>

              {patients.map((patient) => (
                <Pressable
                  key={patient.id}
                  onPress={() => navigation.navigate("PatientDetails", { patient })}
                  className="border border-neutral-500 rounded-2xl p-4 active:opacity-70"
                >
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
                      {patient.user?.avatar ? (
                        <Image
                          source={{ uri: patient.user.avatar }}
                          className="w-12 h-12 rounded-full border border-neutral-400"
                        />
                      ) : (
                        <User size={20} color={colors.neutral[500]} />
                      )}
                    </View>

                    <View className="flex-1">
                      <Text className="text-neutral-900 font-semibold text-base">
                        {patient.user.name}
                      </Text>

                      <Text className="text-neutral-600 text-sm">{patient.user.email}</Text>

                      {patient.lastVisit && (
                        <Text className="text-neutral-500 text-xs mt-1">
                          Última visita: {patient.lastVisit.toLocaleDateString()}
                        </Text>
                      )}
                    </View>

                    <View className="justify-center ml-2">
                      <ChevronRight size={20} color={colors.neutral[400]} />
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="px-4 gap-4">
              <Text className="text-lg font-semibold text-neutral-900">Pacientes</Text>

              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-900 font-medium text-base text-center">
                  Nenhum paciente cadastrado
                </Text>

                <Text className="text-neutral-600 text-center mt-2">
                  Os pacientes aparecerão aqui conforme se cadastrarem no sistema.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <NavigationBar />
    </View>
  )
}
