import { AppStackScreenProps } from "@/navigators"
import { ReactElement, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { Calendar } from "react-native-calendars"

interface SelectDateTimeScreenProps extends AppStackScreenProps<"SelectDateTime"> {}

export const SelectDateTimeScreen = ({
  navigation,
  route,
}: SelectDateTimeScreenProps): ReactElement => {
  const { doctor } = route.params

  const [selectedDate, setSelectedDate] = useState<string>("")

  const availableTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"]

  return (
    <View className="flex-1 bg-background px-6 pt-10 gap-6">
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#3B82F6",
          },
        }}
        theme={{
          backgroundColor: "#000",
          calendarBackground: "#000",
          dayTextColor: "#fff",
          monthTextColor: "#fff",
          selectedDayBackgroundColor: "#3B82F6",
          arrowColor: "#3B82F6",
          todayTextColor: "#3B82F6",
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />

      <Text className="text-white font-medium mt-6 mb-2">Horários disponíveis</Text>

      <FlatList
        data={availableTimes}
        keyExtractor={(time: string) => time}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        renderItem={(time: string) => (
          <TouchableOpacity
            className="border border-primary rounded-xl px-4 py-2"
            onPress={(): void =>
              navigation.navigate("ConfirmAppointment", { doctor, date: selectedDate, time })
            }
          >
            <Text className="text-white text-center">{time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
