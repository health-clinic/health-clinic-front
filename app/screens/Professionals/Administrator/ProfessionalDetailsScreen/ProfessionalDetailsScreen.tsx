import React, { FC, ReactElement } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import { Building2, ChevronLeft, FileText, Mail, Stethoscope, User } from "lucide-react-native"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { Professional } from "@/models/Professional"

interface ProfessionalDetailsScreenProps
  extends AdministratorAppStackScreenProps<"ProfessionalDetails"> {}

export const ProfessionalDetailsScreen: FC<ProfessionalDetailsScreenProps> = ({
  navigation,
  route,
}: ProfessionalDetailsScreenProps): ReactElement => {
  const { professional } = route.params as { professional: Professional }

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
    const schedule = professional.schedules?.find((s: any) => s.dayOfWeek === dayIndex)
    return schedule || null
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="flex-1 text-neutral-800 text-lg font-semibold">
          Detalhes do profissional
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4">
          <View className="px-4 pt-2 gap-2">
            <View className="flex-row gap-3">
              <View className="w-14 h-14 rounded-full bg-neutral-300 items-center justify-center">
                {professional.user?.avatar ? (
                  <Image
                    source={{ uri: professional.user.avatar }}
                    className="w-14 h-14 rounded-full border border-neutral-400"
                  />
                ) : (
                  <User size={28} color={colors.neutral[500]} />
                )}
              </View>

              <View className="flex-1 justify-center">
                <Text className="text-neutral-800 text-xl font-semibold" numberOfLines={2}>
                  {professional.user?.name}
                </Text>

                <View className="flex-row items-center gap-2 mt-1">
                  <Stethoscope size={16} color={colors.primary[500]} />
                  <Text className="text-neutral-600 text-sm">{professional.specialty}</Text>
                </View>
              </View>
            </View>

            <View className="h-px bg-neutral-300" />

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Mail size={16} color={colors.primary[500]} />
                <Text className="text-neutral-600 text-sm">{professional.user?.email}</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <FileText size={16} color={colors.primary[500]} />
                <Text className="text-neutral-600 text-sm">CRM: {professional.crm}</Text>
              </View>
            </View>
          </View>

          <View className="h-px bg-neutral-300" />

          <View className="px-4 gap-4">
            <Text className="text-neutral-800 text-base font-semibold">Horários de trabalho</Text>

            <View className="bg-transparent border border-neutral-400 rounded-2xl overflow-hidden">
              <View className="p-4 gap-3">
                {dayNames.map((dayName, index) => {
                  const schedule = getScheduleForDay(index)

                  return (
                    <View key={index} className="flex-row items-center justify-between py-1">
                      <Text className="text-neutral-800 text-sm font-medium flex-1">{dayName}</Text>

                      <Text className="text-neutral-600 text-sm">
                        {schedule ? `${schedule.start} - ${schedule.end}` : "Não trabalha"}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          {professional.units && professional.units.length > 0 ? (
            <View className="gap-4">
              <View className="px-4 flex-row justify-between items-center">
                <Text className="text-neutral-800 text-base font-semibold">
                  Unidades de atuação
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
                className="flex-row"
              >
                {professional.units.map((unit: any, index: number) => (
                  <View
                    key={index}
                    className="border border-neutral-500 rounded-2xl overflow-hidden w-64"
                  >
                    <View className="p-3">
                      <View className="flex-row items-center gap-2">
                        <View className="w-10 h-10 rounded-full bg-neutral-300 items-center justify-center">
                          <Building2 size={20} color={colors.neutral[500]} />
                        </View>

                        <View className="flex-1">
                          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
                            {unit.name}
                          </Text>

                          <Text className="text-zinc-400 text-xs" numberOfLines={2}>
                            {unit.address
                              ? `${unit.address.street}, ${unit.address.number} - ${unit.address.district}`
                              : "Endereço não informado"}
                          </Text>

                          <Text className="text-zinc-400 text-xs mt-1" numberOfLines={1}>
                            {unit.address ? `${unit.address.city}/${unit.address.state}` : ""}
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
              <Text className="text-neutral-800 text-base font-semibold">Unidades de Atuação</Text>

              <View className="gap-4 p-4 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center">
                  Nenhuma unidade cadastrada
                </Text>

                <Text className="text-neutral-600 text-sm text-center pt-1">
                  As unidades onde o profissional atua aparecerão aqui.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
