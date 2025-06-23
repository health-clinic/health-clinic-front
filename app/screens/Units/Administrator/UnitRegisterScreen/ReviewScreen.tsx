import { FC, ReactElement } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Building2, ChevronLeft, Clock, MapPin, Users } from "lucide-react-native"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

interface FormProfessionalSchedule {
  professionalId: number
  dayOfWeek: string
  start: string
  end: string
}

interface Professional {
  id: number
  name: string
  specialty: string
  schedules: FormProfessionalSchedule[]
}

interface ExtendedCreateUnitData {
  name?: string
  phone?: string
  address?: {
    zipCode?: string
    state?: string
    city?: string
    district?: string
    street?: string
    number?: number
  }
  professionals?: Professional[]
  schedules?: {
    dayOfWeek: string
    opening: string
    closing: string
    closed: boolean
  }[]
}

interface ReviewScreenProps {
  formData: ExtendedCreateUnitData
  onSubmit: () => void
  onBack: () => void
}

export const ReviewScreen: FC<ReviewScreenProps> = ({
  formData,
  onSubmit,
  onBack,
}: ReviewScreenProps): ReactElement => {
  const colors = tailwind.theme.extend.colors

  return (
    <View className="flex-1 gap-4">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
          <TouchableOpacity onPress={onBack} className="h-9 w-9 items-center justify-center">
            <ChevronLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>

          <Text className="text-neutral-800 text-lg font-semibold">Nova unidade</Text>
      </View>

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

          <View className="w-12 h-0.5 bg-primary-600" />
        </View>

        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center">
            <Text className="text-white font-medium">5</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-2 px-4">
        <Building2 size={24} color={colors.primary[600]} />

        <Text className="text-neutral-800 text-lg font-bold">Revisão e confirmação</Text>
      </View>

      <Text className="text-neutral-600 text-sm px-4">
        Revise todas as informações antes de finalizar o cadastro da unidade.
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Building2 size={20} color="#60a5fa" />

            <Text className="text-white font-medium ml-2">Informações básicas</Text>
          </View>

          <View className="mb-3">
            <Text className="text-gray-400 text-xs">Nome</Text>

            <Text className="text-white text-base">{formData.name || "-"}</Text>
          </View>

          <View className="mb-3">
            <Text className="text-gray-400 text-xs">Telefone</Text>

            <Text className="text-white text-base">{formData.phone || "-"}</Text>
          </View>
        </View>

        {formData.address && (
          <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <MapPin size={20} color="#60a5fa" />

              <Text className="text-white font-medium ml-2">Endereço</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-400 text-xs">CEP</Text>

              <Text className="text-white text-base">{formData.address.zipCode || "-"}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-400 text-xs">Rua</Text>

              <Text className="text-white text-base">{formData.address.street || "-"}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-400 text-xs">Número</Text>

              <Text className="text-white text-base">{formData.address.number || "-"}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-400 text-xs">Bairro</Text>

              <Text className="text-white text-base">{formData.address.district || "-"}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-400 text-xs">Cidade</Text>

              <Text className="text-white text-base">{formData.address.city || "-"}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-400 text-xs">Estado</Text>

              <Text className="text-white text-base">{formData.address.state || "-"}</Text>
            </View>
          </View>
        )}

        {formData.schedules && (
          <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <Clock size={20} color="#60a5fa" />

              <Text className="text-white font-medium ml-2">Horários de funcionamento</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-400 text-xs">Horários da unidade</Text>

              {(() => {
                const openDays = formData.schedules?.filter((hour: any) => !hour.closed) || []
                if (openDays.length === 0) {
                  return <Text className="text-white text-base">Nenhum horário definido</Text>
                }

                return (
                  <View className="gap-1">
                    {openDays.map((hour: any, index: number) => (
                      <Text key={index} className="text-white text-base">
                        {hour.dayOfWeek}: {hour.opening || "00:00"} - {hour.closing || "00:00"}
                      </Text>
                    ))}
                  </View>
                )
              })()}
            </View>
          </View>
        )}

        {formData.professionals &&
          formData.professionals.filter(
            (professional) => professional.schedules && professional.schedules.length > 0,
          ).length > 0 && (
            <View className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <View className="flex-row items-center">
                <Users size={20} color="#60a5fa" />

                <Text className="text-white font-medium ml-2">Profissionais</Text>
              </View>

              {formData.professionals
                .filter(
                  (professional) => professional.schedules && professional.schedules.length > 0,
                )
                .map((professional) => (
                  <View key={professional.id} className="mb-2">
                    <Text className="text-white text-sm font-medium">{professional.name}</Text>

                    <Text className="text-gray-300 text-xs">{professional.specialty}</Text>

                    {professional.schedules && (
                      <View className="mt-2">
                        <Text className="text-gray-400 text-xs mb-1">Horários:</Text>

                        {professional.schedules
                          .filter((schedule) => !schedule.closed)
                          .map((schedule, index) => {
                            return (
                              <View key={index}>
                                <View className="gap-0.5">
                                  <Text className="text-gray-400 text-xs">
                                    {schedule.dayOfWeek}: {schedule.start || "00:00"} -{" "}
                                    {schedule.end || "00:00"}
                                  </Text>
                                </View>
                              </View>
                            )
                          })}
                      </View>
                    )}
                  </View>
                ))}
          </View>
        )}
      </ScrollView>

      <View className="flex-row gap-2 px-4 pb-4">
        <TouchableOpacity
          onPress={onBack}
          className="flex-1 bg-transparent border border-primary-600 items-center py-4 rounded-xl"
        >
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSubmit}
          className="flex-1 bg-primary-600 items-center py-4 rounded-xl"
        >
          <Text className="text-base font-bold text-neutral-900">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
