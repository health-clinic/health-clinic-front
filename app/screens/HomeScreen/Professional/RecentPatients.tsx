import { ReactElement } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import { Patient } from "@/models/Patient"
import { Button } from "@/components/Button"

interface RecentPacientsProps {
  patients: Patient[]
}

export const RecentPatients = ({ patients }: RecentPacientsProps): ReactElement => {
  return (
    <View className="gap-4">
      <Text className="px-4 text-neutral-900 font-semibold text-base">Pacientes Recentes</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex-row gap-4 px-4"
      >
        {patients.map((patient) => (
          <View
            key={patient.id}
            className="flex flex-col justify-between w-56 rounded-2xl border border-primary-500 bg-neutral-200 p-3"
          >
            <View className="flex-row items-center gap-3">
              {patient.user.avatar ? (
                <Image
                  source={{ uri: patient.user.avatar }}
                  className="w-10 h-10 rounded-full border border-primary-400"
                />
              ) : (
                <View className="w-10 h-10 rounded-full bg-primary-300 justify-center items-center">
                  <Text className="text-white font-bold">
                    {patient.user.name.slice(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}

              <View className="flex-1">
                <Text className="text-neutral-900 font-bold text-sm">{patient.user.name}</Text>
                <Text className="text-neutral-600 text-[10px]">
                  Última consulta: {patient.lastVisit}
                </Text>
              </View>
            </View>

            <Text numberOfLines={2} ellipsizeMode="tail" className="text-neutral-900 text-xs mt-2">
              {patient.note}
            </Text>

            <View className="flex-row flex-wrap gap-2 mt-2">
              {patient.tags.map((tag, index) => (
                <View key={index} className="rounded-full px-2 py-0.5 bg-primary-200">
                  <Text className="text-[10px] text-neutral-100 font-semibold">{tag}</Text>
                </View>
              ))}
            </View>

            <Button className="mt-3 h-8 justify-center">
              <Text className="text-white text-xs font-semibold">Ver Registro</Text>
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
