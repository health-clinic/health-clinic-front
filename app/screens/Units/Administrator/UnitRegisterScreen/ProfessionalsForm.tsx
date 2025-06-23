import React, { ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Check, ChevronLeft, Clock, Users } from "lucide-react-native"
import { Button } from "@/components/Button"
import { TextInput } from "@/components/TextInput"
import { createProfessionalApi } from "@/services/professional/professional.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { useStores } from "@/models"
import { Professional } from "@/models/Professional/professional.model"
import { ProfessionalResponse } from "@/services/professional/professional.api.types"

const TimePresets = [
  { label: "Manhã", start: "08:00", end: "12:00" },
  { label: "Tarde", start: "13:00", end: "17:00" },
  { label: "Comercial", start: "08:00", end: "18:00" },
  { label: "Integral", start: "07:00", end: "19:00" },
]

interface FormProfessionalSchedule {
  professionalId: number
  dayOfWeek: string
  start: string
  end: string
  closed: boolean
}

interface FormProfessional {
  id: number
  name: string
  specialty: string
  schedules: FormProfessionalSchedule[]
}

interface UnitScheduleForm {
  dayOfWeek: string
  opening: string
  closing: string
  closed: boolean
}

interface ProfessionalsFormData {
  professionals: FormProfessional[]
}

interface ProfessionalsFormProps {
  initialValues?: {
    professionals?: FormProfessional[]
    schedules?: UnitScheduleForm[]
  }
  onNext: (values: ProfessionalsFormData) => void
  onBack: () => void
}

export const ProfessionalsForm = ({
  initialValues,
  onNext,
  onBack,
}: ProfessionalsFormProps): ReactElement => {
  const { loadingStore, professionalStore, userStore } = useStores()

  const colors = tailwind.theme.extend.colors

  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [selectedProfessionals, setSelectedProfessionals] = useState<number[]>([])
  const [professionalSchedules, setProfessionalSchedules] = useState<FormProfessionalSchedule[]>([])

  const toProfessionals = (data: ProfessionalResponse): Professional[] => {
    return data.map((professional) => {
      userStore.set(professional.id, {
        id: professional.id,
        address: null,
        name: professional.name,
        email: professional.email,
        avatar: null,
        phone: "",
        birthdate: null,
        document: "",
        role: "professional",
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })

      return professionalStore.set(professional.id, {
        id: professional.id,
        specialty: professional.specialty,
        unit: professional.id,
        user: professional.id,
        crm: "",
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })
    })
  }

  const fetchProfessionals = async () => {
    loadingStore.setLoading(true)

    try {
      const response = await createProfessionalApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      setProfessionals(toProfessionals(response.professionals))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const toggleProfessional = (professionalId: number) => {
    setSelectedProfessionals((prev) => {
      const isSelected = prev.includes(professionalId)
      if (!isSelected) {
        const unitSchedules = initialValues?.schedules || []
        const newSchedules = unitSchedules
          .filter((schedule) => !schedule.closed)
          .map((schedule) => ({
            professionalId,
            dayOfWeek: schedule.dayOfWeek,
            start: "",
            end: "",
            closed: true,
          }))

        setProfessionalSchedules((current) => [...current, ...newSchedules])

        return [...prev, professionalId]
      }

      setProfessionalSchedules((current) =>
        current.filter((schedule) => schedule.professionalId !== professionalId),
      )

      return prev.filter((id) => id !== professionalId)
    })
  }

  const updateProfessionalSchedule = (
    professionalId: number,
    dayOfWeek: string,
    field: string,
    value: string | boolean,
  ) => {
    setProfessionalSchedules((current) =>
      current.map((schedule) =>
        schedule.professionalId === professionalId && schedule.dayOfWeek === dayOfWeek
          ? {
              ...schedule,
              [field]: value,
            }
          : schedule,
      ),
    )
  }

  const toggleDayClosed = (professionalId: number, dayOfWeek: string) => {
    setProfessionalSchedules((current) =>
      current.map((schedule) =>
        schedule.professionalId === professionalId && schedule.dayOfWeek === dayOfWeek
          ? {
              ...schedule,
              closed: !schedule.closed,
              start: schedule.closed ? "" : schedule.start,
              end: schedule.closed ? "" : schedule.end,
            }
          : schedule,
      ),
    )
  }

  const handleNext = () => {
    onNext({
      professionals: professionals.map((professional) => ({
        id: professional.id,
        name: professional.user.name,
        specialty: professional.specialty,
        schedules: professionalSchedules.filter(
          (schedule) => schedule.professionalId === professional.id,
        ),
      })),
    })
  }

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity onPress={onBack} className="h-9 w-9 items-center justify-center">
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">Nova unidade</Text>
      </View>

      <View className="flex-1 gap-4 px-4">
        <View className="flex-row items-center justify-center">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center">
              <Text className="text-white font-medium">1</Text>
            </View>

            <View className="w-12 h-0.5 bg-primary-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center">
              <Text className="text-white font-medium">2</Text>
            </View>

            <View className="w-12 h-0.5 bg-primary-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center">
              <Text className="text-white font-medium">3</Text>
            </View>

            <View className="w-12 h-0.5 bg-primary-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center">
              <Text className="text-white font-medium">4</Text>
            </View>

            <View className="w-12 h-0.5 bg-gray-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
              <Text className="text-white font-medium">5</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Users size={24} color={colors.primary[600]} />

          <Text className="text-neutral-800 text-lg font-bold">Selecione os profissionais</Text>
        </View>

        <Text className="text-neutral-600 text-sm">
          Escolha quais profissionais irão trabalhar nesta unidade e defina seus horários de
          atendimento.
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-4">
            {professionals.map((professional) => {
              const isSelected = selectedProfessionals.includes(professional.id)

              return (
                <View
                  key={professional.id}
                  className={`gap-3 border rounded-2xl p-4 ${
                    isSelected
                      ? "bg-transparent border-primary-500"
                      : "bg-transparent border-neutral-500"
                  }`}
                >
                  <TouchableOpacity
                    onPress={() => toggleProfessional(professional.id)}
                    className="flex-row items-center justify-between"
                  >
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-neutral-800">
                        {professional.user.name}
                      </Text>

                      <Text className="text-sm text-neutral-600">{professional.specialty}</Text>
                    </View>

                    {isSelected ? (
                      <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                        <Check size={16} color="white" />
                      </View>
                    ) : (
                      <View className="w-6 h-6 rounded-full border-2 border-neutral-400" />
                    )}
                  </TouchableOpacity>

                  {isSelected && (
                    <View className="gap-2">
                      <View className="flex-row items-center gap-2">
                        <Clock size={16} color={colors.primary[600]} />

                        <Text className="text-neutral-700 text-sm font-medium">
                          Horários de Atendimento
                        </Text>
                      </View>

                      {professionalSchedules
                        .filter((schedule) => schedule.professionalId === professional.id)
                        .map((schedule, index) => {
                          const isDayOpen = !schedule.closed

                          return (
                            <View
                              key={index}
                              className={`gap-3 border rounded-xl p-3 ${
                                isDayOpen
                                  ? "bg-transparent border-primary-500"
                                  : "bg-transparent border-neutral-500"
                              }`}
                            >
                              <TouchableOpacity
                                onPress={() => toggleDayClosed(professional.id, schedule.dayOfWeek)}
                                className="flex-row items-center justify-between"
                              >
                                <View className="flex-row items-center gap-2">
                                  <View
                                    className={`w-10 h-10 rounded-full items-center justify-center ${
                                      isDayOpen ? "bg-primary-500" : "bg-neutral-200"
                                    }`}
                                  >
                                    <Text
                                      className={`text-xs font-bold ${
                                        isDayOpen ? "text-white" : "text-neutral-600"
                                      }`}
                                    >
                                      {schedule.dayOfWeek.substring(0, 3).toUpperCase()}
                                    </Text>
                                  </View>

                                  <Text className="text-neutral-800 text-sm font-medium">
                                    {schedule.dayOfWeek}
                                  </Text>
                                </View>

                                {isDayOpen && (
                                  <View className="w-5 h-5 rounded-full bg-primary-500 items-center justify-center">
                                    <Check size={12} color="white" />
                                  </View>
                                )}
                              </TouchableOpacity>

                              {isDayOpen && (
                                <View className="flex-1 gap-2">
                                  <View className="flex-row gap-2">
                                    {TimePresets.map((preset) => (
                                      <TouchableOpacity
                                        key={preset.label}
                                        onPress={() => {
                                          updateProfessionalSchedule(
                                            professional.id,
                                            schedule.dayOfWeek,
                                            "start",
                                            preset.start,
                                          )
                                          updateProfessionalSchedule(
                                            professional.id,
                                            schedule.dayOfWeek,
                                            "end",
                                            preset.end,
                                          )
                                        }}
                                        className="px-3 py-1 rounded-full border bg-primary-500/20 border-primary-500/30"
                                      >
                                        <Text className="text-primary-500 text-xs font-medium">
                                          {preset.label}
                                        </Text>
                                      </TouchableOpacity>
                                    ))}
                                  </View>

                                  <View className="flex-row gap-2">
                                    <View className="flex-1 gap-2">
                                      <Text className="text-neutral-600 text-xs">Abertura</Text>

                                      <TextInput.Root>
                                        <TextInput.Control
                                          value={schedule.start}
                                          onChangeText={(value: string) => {
                                            updateProfessionalSchedule(
                                              professional.id,
                                              schedule.dayOfWeek,
                                              "start",
                                              value,
                                            )
                                          }}
                                          keyboardType="number-pad"
                                          placeholder="08:00"
                                        />
                                      </TextInput.Root>
                                    </View>

                                    <View className="flex-1 gap-2">
                                      <Text className="text-neutral-600 text-xs">Fechamento</Text>

                                      <TextInput.Root>
                                        <TextInput.Control
                                          value={schedule.end}
                                          onChangeText={(value: string) => {
                                            updateProfessionalSchedule(
                                              professional.id,
                                              schedule.dayOfWeek,
                                              "end",
                                              value,
                                            )
                                          }}
                                          keyboardType="number-pad"
                                          placeholder="18:00"
                                        />
                                      </TextInput.Root>
                                    </View>
                                  </View>
                                </View>
                              )}
                            </View>
                          )
                        })}
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>

      <View className="flex-row gap-2 p-4">
        <Button onPress={onBack} className="flex-1 bg-transparent border border-primary-600">
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </Button>

        <Button onPress={handleNext} className="flex-1">
          <Text className="text-base font-bold text-neutral-900">Próximo</Text>
        </Button>
      </View>
    </View>
  )
}
