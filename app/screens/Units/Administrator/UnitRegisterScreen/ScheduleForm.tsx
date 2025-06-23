import { ReactElement, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Check, ChevronLeft, Clock } from "lucide-react-native"
import { Button } from "@/components/Button"
import { TextInput } from "@/components/TextInput"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

interface Schedule {
  dayOfWeek: string
  opening: string
  closing: string
  closed: boolean
}

interface ScheduleFormData {
  schedules: Schedule[]
}

interface ScheduleFormProps {
  initialValues?: { schedules?: Schedule[] }
  onNext: (values: { schedules: Schedule[] }) => void
  onBack: () => void
}

const DaysOfWeek = [
  { key: "sunday", label: "Domingo", short: "DOM" },
  { key: "monday", label: "Segunda-feira", short: "SEG" },
  { key: "tuesday", label: "Terça-feira", short: "TER" },
  { key: "wednesday", label: "Quarta-feira", short: "QUA" },
  { key: "thursday", label: "Quinta-feira", short: "QUI" },
  { key: "friday", label: "Sexta-feira", short: "SEX" },
  { key: "saturday", label: "Sábado", short: "SÁB" },
]

const TimePresets = [
  { label: "Manhã", start: "08:00", end: "12:00" },
  { label: "Tarde", start: "13:00", end: "17:00" },
  { label: "Comercial", start: "08:00", end: "18:00" },
  { label: "Integral", start: "07:00", end: "19:00" },
]

export const ScheduleForm = ({
  initialValues,
  onNext,
  onBack,
}: ScheduleFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors

  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    if (initialValues?.schedules) {
      return initialValues.schedules
        .filter((hour) => !hour.closed)
        .map((hour) => {
          const index = DaysOfWeek.findIndex((day) => day.label === hour.dayOfWeek)

          return DaysOfWeek[index]?.key || ""
        })
        .filter(Boolean)
    }

    return []
  })
  const [schedules, setWorkHours] = useState<Record<string, { opening: string; closing: string }>>(
    () => {
      const hours: Record<string, { opening: string; closing: string }> = {}

      if (initialValues?.schedules) {
        initialValues.schedules.forEach((hour) => {
          const index = DaysOfWeek.findIndex((day) => day.label === hour.dayOfWeek)
          const key = DaysOfWeek[index]?.key

          if (key && !hour.closed) {
            hours[key] = { opening: hour.opening, closing: hour.closing }
          }
        })
      }

      return hours
    },
  )

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

            <View className="w-12 h-0.5 bg-gray-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
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
          <Clock size={24} color={colors.primary[600]} />

          <Text className="text-neutral-800 text-lg font-bold">Horários de funcionamento</Text>
        </View>

        <Text className="text-neutral-600 text-sm">
          Configure os dias e horários de funcionamento da unidade.
        </Text>

        <View className="gap-2">
          <Text className="text-neutral-700 text-sm font-medium">
            Aplicar horário padrão para todos os dias selecionados:
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
            <View className="flex-row gap-2">
              {TimePresets.map((preset) => (
                <TouchableOpacity
                  key={preset.label}
                  onPress={() => {
                    const newHours: Record<string, { opening: string; closing: string }> = {}
                    selectedDays.forEach((dayKey) => {
                      newHours[dayKey] = { opening: preset.start, closing: preset.end }
                    })
                    setWorkHours(newHours)
                  }}
                  className="bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2"
                >
                  <Text className="text-neutral-700 text-sm font-medium">{preset.label}</Text>
                  <Text className="text-neutral-500 text-xs">
                    {preset.start} - {preset.end}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-4">
            {DaysOfWeek.map((day) => {
              const isSelected = selectedDays.includes(day.key)
              const hours = schedules[day.key] || { opening: "08:00", closing: "18:00" }

              return (
                <View
                  key={day.key}
                  className={`gap-3 bg-transparent rounded-2xl p-4 ${
                    isSelected ? "border border-primary-500" : "border border-neutral-500"
                  }`}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (isSelected) {
                        const newHours = { ...schedules }

                        delete newHours[day.key]

                        setWorkHours(newHours)
                        setSelectedDays((prev) => prev.filter((d) => d !== day.key))
                      } else {
                        setWorkHours((prev) => ({
                          ...prev,
                          [day.key]: { opening: "08:00", closing: "18:00" },
                        }))
                        setSelectedDays((prev) => [...prev, day.key])
                      }
                    }}
                    className="flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center gap-2">
                      <View
                        className={`w-12 h-12 rounded-full items-center justify-center ${
                          isSelected ? "bg-primary-500" : "bg-neutral-200"
                        }`}
                      >
                        <Text
                          className={`text-sm font-bold ${
                            isSelected ? "text-white" : "text-neutral-600"
                          }`}
                        >
                          {day.short}
                        </Text>
                      </View>

                      <Text className="text-neutral-800 text-base font-medium">{day.label}</Text>
                    </View>

                    {isSelected && (
                      <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                        <Check size={16} color="white" />
                      </View>
                    )}
                  </TouchableOpacity>

                  {isSelected && (
                    <View className="flex-1 gap-2">
                      <View className="flex-row gap-2">
                        {TimePresets.map((preset) => (
                          <TouchableOpacity
                            key={preset.label}
                            onPress={() => {
                              setWorkHours((prev) => ({
                                ...prev,
                                [day.key]: { opening: preset.start, closing: preset.end },
                              }))
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
                          <Text className="text-neutral-600 text-sm">Abertura</Text>

                          <TextInput.Root>
                            <TextInput.Control
                              value={hours.opening}
                              onChangeText={(value: string) => {
                                setWorkHours((prev) => ({
                                  ...prev,
                                  [day.key]: {
                                    ...prev[day.key],
                                    opening: value,
                                  },
                                }))
                              }}
                              keyboardType="number-pad"
                              placeholder="08:00"
                            />
                          </TextInput.Root>
                        </View>

                        <View className="flex-1 gap-2">
                          <Text className="text-neutral-600 text-sm">Fechamento</Text>

                          <TextInput.Root>
                            <TextInput.Control
                              value={hours.closing}
                              onChangeText={(value: string) => {
                                setWorkHours((prev) => ({
                                  ...prev,
                                  [day.key]: {
                                    ...prev[day.key],
                                    closing: value,
                                  },
                                }))
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
        </ScrollView>
      </View>

      <View className="flex-row gap-2 p-4">
        <Button onPress={onBack} className="flex-1 bg-transparent border border-primary-600">
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </Button>

        <Button
          onPress={() => {
            const formSchedules: Schedule[] = DaysOfWeek.map((day) => {
              const isSelected = selectedDays.includes(day.key)
              const hours = schedules[day.key]

              return {
                dayOfWeek: day.label,
                opening: isSelected && hours ? hours.opening : "",
                closing: isSelected && hours ? hours.closing : "",
                closed: !isSelected,
              }
            })

            onNext({ schedules: formSchedules })
          }}
          className={`flex-1 ${selectedDays.length === 0 ? "bg-neutral-400" : "bg-primary-500"}`}
          disabled={selectedDays.length === 0}
        >
          <Text className="text-base font-bold text-neutral-900">Próximo</Text>
        </Button>
      </View>
    </View>
  )
}
