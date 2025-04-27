import { AppStackScreenProps } from "@/navigators"
import { ReactElement, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { Professional } from "@/models/Professional"

interface SelectDateTimeScreenProps extends AppStackScreenProps<"SelectDateTime"> {}

export const SelectDateTimeScreen = ({
  navigation,
  route,
}: SelectDateTimeScreenProps): ReactElement => {
  const { professional } = route.params as { professional: Professional }

  const [date, setDate] = useState<string>("")

  const availableTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"]

  return (
    <View className="flex-1 bg-background px-6 pt-10 gap-6">
      <Calendar
        onDayPress={(day) => setDate(day.dateString)}
        markedDates={{
          [date]: {
            selected: true,
            selectedColor: "#2563EB",
            customStyles: {
              container: {
                backgroundColor: "#2563EB",
                borderRadius: 999,
              },
              text: {
                color: "white",
                fontWeight: "bold",
              },
            },
          },
        }}
        markingType="custom"
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          textSectionTitleColor: "#6B7280",
          selectedDayBackgroundColor: "#2563EB",
          selectedDayTextColor: "#fff",
          todayTextColor: "#3B82F6",
          dayTextColor: "#fff",
          textDisabledColor: "#4B5563",
          dotColor: "#2563EB",
          selectedDotColor: "#fff",
          arrowColor: "#3B82F6",
          monthTextColor: "#fff",
          indicatorColor: "#3B82F6",
          textDayFontWeight: "600",
          textMonthFontSize: 20,
          textMonthFontWeight: "bold",
          textDayHeaderFontSize: 14,
          textDayFontSize: 16,
        }}
        firstDay={1}
        enableSwipeMonths
      />

      <Text className="text-white font-medium mt-6 mb-2">Horários disponíveis</Text>

      <FlatList
        data={availableTimes}
        keyExtractor={(time: string) => time}
        numColumns={2}
        columnWrapperClassName="flex-row justify-between gap-4"
        contentContainerClassName="flex gap-4"
        renderItem={({ item: time }) => (
          <TouchableOpacity
            className="flex-1 border border-primary-500 rounded-xl px-4 py-2"
            onPress={(): void =>
              navigation.navigate("ConfirmSchedule", { professional, date, time })
            }
          >
            <Text className="text-white text-center">{time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
