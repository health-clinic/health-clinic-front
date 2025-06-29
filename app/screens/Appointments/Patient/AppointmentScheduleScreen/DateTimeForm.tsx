import { FC, ReactElement, useMemo, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ChevronLeft, Clock, UserIcon } from "lucide-react-native"
import { Calendar, LocaleConfig } from "react-native-calendars"
import { format, getDay, parse } from "date-fns"
import { StepIndicator } from "@/components/StepIndicator"
import { Professional } from "@/models/Professional"
/* @ts-ignore */
import tailwind from "./../../../../../tailwind.config"
import { toZonedDate } from "@/utils/date/convert"

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
}
LocaleConfig.defaultLocale = "pt-br"

interface DateTimeFormProps {
  professional: Professional
  onNext: (scheduledFor: string) => void
  onBack: () => void
}

export const DateTimeForm: FC<DateTimeFormProps> = ({
  professional,
  onNext,
  onBack,
}: DateTimeFormProps): ReactElement => {
  const navigation = useNavigation()

  const colors = tailwind.theme.extend.colors

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  const availableTimes = useMemo(() => {
    if (!selectedDate) return []

    const date = toZonedDate(selectedDate)
    const dayOfWeek = getDay(date)

    const schedules = Array.from(professional.schedules.values()).filter(
      (schedule) => schedule.professionalId === professional.id && schedule.dayOfWeek === dayOfWeek,
    )

    if (schedules.length === 0) {
      return []
    }

    const timeSlots: string[] = []

    schedules.forEach((schedule) => {
      const startTime = schedule.start
      const endTime = schedule.end

      const startHour = parseInt(startTime.split(":")[0])
      const startMinute = parseInt(startTime.split(":")[1])
      const endHour = parseInt(endTime.split(":")[0])
      const endMinute = parseInt(endTime.split(":")[1])

      let currentHour = startHour
      let currentMinute = startMinute

      while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const timeSlot = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`
        timeSlots.push(timeSlot)

        currentHour += 1
        if (currentHour > endHour || (currentHour === endHour && currentMinute >= endMinute)) {
          break
        }
      }
    })

    return [...new Set(timeSlots)].sort()
  }, [selectedDate, professional.id, professional.schedules])

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      const parsed = parse(`${selectedDate} ${selectedTime}`, "yyyy-MM-dd HH:mm", new Date())
      const scheduledFor = format(parsed, "yyyy-MM-dd HH:mm")
      onNext(scheduledFor)
    }
  }

  const isNextDisabled = !selectedDate || !selectedTime

  return (
    <View className="flex-1 gap-2">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home" as never)}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">Agendar consulta</Text>
      </View>

      <View className="flex-1 gap-6 p-4">
        <StepIndicator currentStep={4} totalSteps={5} />

        <View className="gap-2">
          <View className="flex-row gap-3 items-center">
            <Clock size={24} color={colors.primary[500]} />
            <Text className="text-xl font-semibold text-neutral-900">
              Selecione a data e o horário
            </Text>
          </View>

          <Text className="text-base text-neutral-600 leading-6">
            Escolha a data e horário para sua consulta com {professional.user.name}
          </Text>
        </View>

        <View className="bg-transparent border border-neutral-500 rounded-xl p-4">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-neutral-300 items-center justify-center mr-3">
              {professional.user?.avatar ? (
                <Image
                  source={{ uri: professional.user.avatar }}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <UserIcon size={24} color={colors.neutral[500]} />
              )}
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-base text-neutral-900">
                {professional.user.name}
              </Text>
              <Text className="text-sm text-neutral-600">{professional.specialty}</Text>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="gap-6">
            <View className="bg-transparent rounded-xl p-4 border border-neutral-500">
              <Calendar
                current={selectedDate || new Date().toDateString()}
                onDayPress={(day: any) => {
                  setSelectedDate(day.dateString)
                  setSelectedTime("") // Reset time when date changes
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: colors.primary[500],
                  },
                }}
                theme={{
                  backgroundColor: "transparent",
                  calendarBackground: "transparent",
                  textSectionTitleColor: colors.neutral[600],
                  selectedDayBackgroundColor: colors.primary[500],
                  selectedDayTextColor: colors.neutral[900],
                  todayTextColor: colors.primary[500],
                  dayTextColor: colors.neutral[800],
                  textDisabledColor: colors.neutral[400],
                  dotColor: colors.primary[500],
                  selectedDotColor: colors.neutral[900],
                  arrowColor: colors.primary[500],
                  monthTextColor: colors.neutral[800],
                  indicatorColor: colors.primary[500],
                  textDayFontWeight: "600",
                  textMonthFontSize: 16,
                  textMonthFontWeight: "bold",
                  textDayHeaderFontSize: 14,
                  textDayFontSize: 14,
                }}
                enableSwipeMonths
                firstDay={0}
                renderHeader={(date: Date) => {
                  const year = date.getFullYear()
                  const month = date.getMonth()
                  const months = [
                    "janeiro",
                    "fevereiro",
                    "março",
                    "abril",
                    "maio",
                    "junho",
                    "julho",
                    "agosto",
                    "setembro",
                    "outubro",
                    "novembro",
                    "dezembro",
                  ]

                  return (
                    <Text className="text-neutral-800 font-bold text-base">
                      {`${months[month]} de ${year}`}
                    </Text>
                  )
                }}
                minDate={new Date().toISOString().split("T")[0]}
              />
            </View>

            {selectedDate ? (
              availableTimes.length > 0 ? (
                <View className="gap-4">
                  <Text className="text-lg font-semibold text-neutral-900">
                    Horários disponíveis para {format(new Date(selectedDate), "dd/MM/yyyy")}
                  </Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex-row gap-3 px-1"
                  >
                    {availableTimes.map((time: string) => {
                      const isSelected = selectedTime === time

                      return (
                        <TouchableOpacity
                          key={time}
                          className={`border bg-transparent rounded-2xl px-6 py-4 flex-row items-center justify-between min-w-28 ${
                            isSelected ? "border-primary-500" : "border-neutral-500"
                          }`}
                          onPress={() => setSelectedTime(time)}
                        >
                          <Text className="text-neutral-900 font-medium text-base text-center flex-1">
                            {time}
                          </Text>
                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                </View>
              ) : (
                <View className="flex flex-col gap-4">
                  <Text className="text-lg font-semibold text-neutral-900">
                    Horários para {format(new Date(selectedDate), "dd/MM/yyyy")}
                  </Text>
                  <View className="p-6 border border-neutral-500 rounded-2xl">
                    <View className="w-full h-0.5 bg-neutral-700 mb-4">
                      <View className="w-0 h-full bg-primary-500" />
                    </View>

                    <Text className="text-white font-medium text-base text-center">
                      Nenhum horário disponível
                    </Text>

                    <Text className="text-zinc-400 text-center mt-2">
                      O profissional não tem horários disponíveis nesta data. Tente selecionar outra
                      data.
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <View className="flex flex-col gap-4">
                <View className="p-6 border border-neutral-500 rounded-2xl">
                  <View className="w-full h-0.5 bg-neutral-700 mb-4">
                    <View className="w-0 h-full bg-primary-500" />
                  </View>

                  <Text className="text-white font-medium text-base text-center">
                    Selecione uma data
                  </Text>

                  <Text className="text-zinc-400 text-center mt-2">
                    Escolha uma data no calendário para ver os horários disponíveis
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 bg-transparent border border-primary-600 items-center py-4 rounded-xl"
          >
            <Text className="text-base font-bold text-primary-600">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            disabled={isNextDisabled}
            className={`flex-1 items-center py-4 rounded-xl ${
              isNextDisabled ? "bg-neutral-300" : "bg-primary-600"
            }`}
          >
            <Text
              className={`text-base font-bold ${
                isNextDisabled ? "text-neutral-500" : "text-neutral-900"
              }`}
            >
              Próximo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
