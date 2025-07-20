import React, { FC, ReactElement } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AdministratorAppStackScreenProps } from "@/navigators"
import {
  Calendar,
  ChevronLeft,
  FileText,
  Heart,
  Info,
  MapPin,
  Phone,
  User,
} from "lucide-react-native"
import { format } from "date-fns"
import { formatCNS, formatDocument, formatPhone } from "@/utils/formatters"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { Patient } from "@/models/Patient"
import { toZonedDateString } from "@/utils/date/convert"

interface PatientDetailsScreenProps extends AdministratorAppStackScreenProps<"PatientDetails"> {}

export const PatientDetailsScreen: FC<PatientDetailsScreenProps> = ({
  navigation,
  route,
}: PatientDetailsScreenProps): ReactElement => {
  const { patient } = route.params as { patient: Patient }

  const colors = tailwind.theme.extend.colors

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="flex-1 text-neutral-800 text-lg font-semibold">Detalhes do paciente</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4">
          <View className="px-4 pt-2 gap-2">
            <View className="flex-row gap-4">
              <View className="w-20 h-20 rounded-full bg-neutral-300 items-center justify-center self-center">
                {patient.user?.avatar ? (
                  <Image
                    source={{ uri: patient.user.avatar }}
                    className="w-20 h-20 rounded-full border border-neutral-400"
                  />
                ) : (
                  <User size={40} color={colors.neutral[500]} />
                )}
              </View>

              <View className="flex-1">
                <Text className="text-neutral-800 text-xl font-semibold">{patient.user?.name}</Text>

                <View className="pt-2 gap-2">
                  <View className="flex-row items-center gap-2">
                    <Calendar size={16} color={colors.primary[500]} />

                    <Text className="text-neutral-600 text-sm">
                      {patient.user?.birthdate
                        ? toZonedDateString(patient.user.birthdate)
                        : "Data não informada"}
                    </Text>
                  </View>

                  {patient.cns && (
                    <View className="flex-row items-center gap-2">
                      <Heart size={16} color={colors.primary[500]} />

                      <Text className="text-neutral-600 text-sm">
                        CNS: {formatCNS(patient.cns)}
                      </Text>
                    </View>
                  )}

                  <View className="flex-row items-center gap-2">
                    <FileText size={16} color={colors.primary[500]} />

                    <Text className="text-neutral-600 text-sm">
                      CPF: {formatDocument(patient.user?.document || "")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="h-px bg-neutral-300" />

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Phone size={16} color={colors.primary[500]} />

                <Text className="text-neutral-600 text-sm">
                  {formatPhone(patient.user?.phone || "")}
                </Text>
              </View>

              {patient.user?.address && (
                <View className="flex-row items-center gap-2">
                  <MapPin size={16} color={colors.primary[500]} />

                  <Text className="text-neutral-600 text-sm">
                    {`${patient.user.address.street}, ${patient.user.address.number} - ${patient.user.address.district}, ${patient.user.address.city}/${patient.user.address.state}`}
                  </Text>
                </View>
              )}
            </View>

            {patient.tags && patient.tags.length > 0 && (
              <View className="flex-row flex-wrap gap-2 pt-2">
                {patient.tags.map((tag, index) => (
                  <View
                    key={index}
                    className="rounded-full px-2 py-0.5 bg-primary-500/10 border border-primary-500/30"
                  >
                    <Text className="text-xs text-neutral-800 font-medium">{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View className="h-px bg-neutral-300" />

          <View className="px-4 gap-4">
            <Text className="text-neutral-800 text-base font-semibold">Anotações</Text>

            {patient.note ? (
              <View className="bg-transparent border border-neutral-400 rounded-2xl overflow-hidden">
                <View className="p-4">
                  <View className="flex-row items-start gap-3">
                    <View className="w-8 h-8 rounded-full bg-primary-500/10 items-center justify-center">
                      <Info size={16} color={colors.primary[500]} />
                    </View>

                    <View className="flex-1">
                      <Text className="text-neutral-800 text-sm leading-relaxed">
                        {patient.note}
                      </Text>

                      <View className="flex-row items-center gap-2 pt-4">
                        <Calendar size={12} color={colors.neutral[600]} />

                        <Text className="text-neutral-600 text-xs">
                          Última atualização: {toZonedDateString(patient.updatedAt)} às{" "}
                          {format(patient.updatedAt, "HH:mm")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View className="gap-4 p-4 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center">
                  Nenhuma anotação registrada
                </Text>

                <Text className="text-neutral-600 text-sm text-center pt-1">
                  As anotações sobre o paciente aparecerão aqui quando houver registros.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
