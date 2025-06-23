import React, { FC, ReactElement } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import { Building2, ChevronLeft, MapPin, Pencil, Phone, User } from "lucide-react-native"
import { formatPhone } from "@/utils/formatters"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { Unit } from "@/models/Unit"

interface UnitDetailsScreenProps extends AdministratorAppStackScreenProps<"UnitDetails"> {}

export const UnitDetailsScreen: FC<UnitDetailsScreenProps> = ({
  navigation,
  route,
}: UnitDetailsScreenProps): ReactElement => {
  const { unit } = route.params as { unit: Unit }

  const colors = tailwind.theme.extend.colors

  const dayNames = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ]

  const getScheduleForDay = (dayIndex: number) => {
    const schedule = unit.schedules?.find((s: any) => s.dayOfWeek === dayIndex)
    return schedule || null
  }

  const getUniqueProfessionals = () => {
    if (!unit.professionalSchedules) return []

    const uniqueProfessionals = new Map()

    unit.professionalSchedules.forEach((schedule: any) => {
      if (schedule.professional && !uniqueProfessionals.has(schedule.professional.id)) {
        uniqueProfessionals.set(schedule.professional.id, schedule.professional)
      }
    })

    return Array.from(uniqueProfessionals.values())
  }

  const uniqueProfessionals = getUniqueProfessionals()

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="flex-1 text-neutral-800 text-lg font-semibold">Detalhes da unidade</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4">
          <View className="px-4 pt-2 gap-2">
            <View className="flex-row gap-3">
              <View className="w-14 h-14 rounded-full bg-neutral-300 items-center justify-center">
                <Building2 size={28} color={colors.neutral[500]} />
              </View>

              <View className="flex-1 justify-center">
                <Text className="text-neutral-800 text-xl font-semibold" numberOfLines={2}>
                  {unit.name}
                </Text>

                <View className="flex-row items-center gap-2 mt-1">
                  <Phone size={16} color={colors.primary[500]} />
                  <Text className="text-neutral-600 text-sm">{formatPhone(unit.phone)}</Text>
                </View>
              </View>
            </View>

            <View className="h-px bg-neutral-300" />

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <MapPin size={16} color={colors.primary[500]} />
                <Text className="text-neutral-600 text-sm">
                  {`${unit.address.street}, ${unit.address.number} - ${unit.address.district}, ${unit.address.city}/${unit.address.state}`}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-px bg-neutral-300" />

          <View className="px-4 gap-4">
            <Text className="text-neutral-800 text-base font-semibold">
              Horário de Funcionamento
            </Text>

            <View className="bg-transparent border border-neutral-400 rounded-2xl overflow-hidden">
              <View className="p-4 gap-3">
                {dayNames.map((dayName, index) => {
                  const schedule = getScheduleForDay(index)

                  return (
                    <View key={index} className="flex-row items-center justify-between py-1">
                      <Text className="text-neutral-800 text-sm font-medium flex-1">{dayName}</Text>

                      <Text className="text-neutral-600 text-sm">
                        {schedule ? `${schedule.opening} - ${schedule.closing}` : "Fechado"}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          {uniqueProfessionals.length > 0 ? (
            <View className="gap-4">
              <View className="px-4 flex-row justify-between items-center">
                <Text className="text-neutral-800 text-base font-semibold">Profissionais</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
                className="flex-row"
              >
                {uniqueProfessionals.map((professional: any) => (
                  <View
                    key={professional.id}
                    className="border border-neutral-500 rounded-2xl overflow-hidden w-64"
                  >
                    <View className="h-1 bg-blue-500" />

                    <View className="p-3">
                      <View className="flex-row items-center gap-2">
                        <View className="w-10 h-10 rounded-full bg-neutral-300 items-center justify-center">
                          {professional.user?.avatar ? (
                            <Image
                              source={{ uri: professional.user.avatar }}
                              className="w-10 h-10 rounded-full border border-neutral-400"
                            />
                          ) : (
                            <User size={20} color={colors.neutral[500]} />
                          )}
                        </View>

                        <View className="flex-1">
                          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
                            {professional.user?.name || "Nome não disponível"}
                          </Text>

                          <Text className="text-zinc-400 text-xs" numberOfLines={1}>
                            {professional.specialty || "Especialidade não informada"}
                          </Text>

                          <Text className="text-zinc-400 text-xs mt-1" numberOfLines={1}>
                            CRM: {professional.crm || "Não informado"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View className="px-4 gap-4">
              <Text className="text-neutral-800 text-base font-semibold">Profissionais</Text>

              <View className="gap-4 p-4 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center">
                  Nenhum profissional cadastrado
                </Text>

                <Text className="text-neutral-600 text-sm text-center pt-1">
                  Os profissionais cadastrados nesta unidade aparecerão aqui.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate("UnitRegister", { unit })}
        className="absolute bottom-6 right-6 bg-primary-500 h-14 w-14 rounded-full items-center justify-center shadow-lg active:opacity-70"
      >
        <Pencil size={24} color={colors.neutral[900]} />
      </TouchableOpacity>
    </View>
  )
}
