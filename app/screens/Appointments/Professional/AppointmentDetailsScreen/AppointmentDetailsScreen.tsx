import { FC, ReactElement } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Appointment } from "@/models/Appointment"
import {
  Calendar,
  ChevronLeft,
  Clock,
  FileText,
  Info,
  MapPin,
  Phone,
  UserIcon,
} from "lucide-react-native"
import { format, isSameHour, isToday } from "date-fns"
import tailwind from "./../../../../../tailwind.config"
import { AppStackScreenProps } from "@/navigators"
import { Link } from "@/components/Link"
import { Button } from "@/components/Button"
import { formatCNS, formatDocument, formatPhone } from "@/utils/formatters"

interface AppointmentDetailScreenProps extends AppStackScreenProps<"AppointmentDetails"> {}

export const AppointmentDetailsScreen: FC<AppointmentDetailScreenProps> = ({
  navigation,
  route,
}: AppointmentDetailScreenProps): ReactElement => {
  const { appointment } = route.params as { appointment: Appointment }
  const colors = tailwind.theme.extend.colors

  const canStartAppointment = (): boolean => {
    const now = new Date()
    return isToday(appointment.scheduledFor) && isSameHour(now, appointment.scheduledFor)
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold flex-1">Detalhes da consulta</Text>

        <View
          className={`px-2 py-1 rounded-full border ${
            appointment.status === "scheduled"
              ? "bg-blue-500/20 border-blue-500/30"
              : appointment.status === "completed"
                ? "bg-green-500/20 border-green-500/30"
                : "bg-neutral-500/20 border-neutral-500/30"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              appointment.status === "scheduled"
                ? "text-blue-500"
                : appointment.status === "completed"
                  ? "text-green-500"
                  : "text-neutral-500"
            }`}
          >
            {appointment.status === "scheduled"
              ? "Agendada"
              : appointment.status === "completed"
                ? "Concluída"
                : ""}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="flex-1 gap-4">
          <View className="px-4 pt-2 gap-2">
            <View className="flex-row gap-4">
              <View className="w-20 h-20 rounded-full bg-neutral-300 items-center justify-center self-center">
                {appointment.patient.user?.avatar ? (
                  <Image
                    source={{ uri: appointment.patient.user.avatar }}
                    className="w-20 h-20 rounded-full border border-neutral-400"
                  />
                ) : (
                  <UserIcon size={40} color={colors.neutral[500]} />
                )}
              </View>

              <View className="flex-1">
                <Text className="text-neutral-800 text-xl font-semibold">
                  {appointment.patient.user.name}
                </Text>

                <View className="pt-2 gap-2">
                  <View className="flex-row items-center gap-2">
                    <Calendar size={16} color={colors.neutral[600]} />

                    <Text className="text-neutral-600 text-sm">
                      {format(appointment.patient.user.birthdate, "dd/MM/yyyy")}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Info size={16} color={colors.neutral[600]} />

                    <Text className="text-neutral-600 text-sm">
                      CNS: {formatCNS(appointment.patient.cns) || "Não informado"}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <FileText size={16} color={colors.neutral[600]} />

                    <Text className="text-neutral-600 text-sm">
                      CPF: {formatDocument(appointment.patient.user.document)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="h-px bg-neutral-300" />

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Phone size={16} color={colors.neutral[600]} />

                <Text className="text-neutral-600 text-sm">
                  {formatPhone(appointment.patient.user.phone)}
                </Text>
              </View>

              {appointment.patient.user.address && (
                <View className="flex-row items-center gap-2">
                  <MapPin size={16} color={colors.neutral[600]} />

                  <Text className="text-neutral-600 text-sm">
                    {`${appointment.patient.user.address.street}, ${appointment.patient.user.address.number} - ${appointment.patient.user.address.district}, ${appointment.patient.user.address.city}/${appointment.patient.user.address.state}`}
                  </Text>
                </View>
              )}
            </View>

            {(appointment.patient.tags.length > 0 || !appointment.patient.lastVisit) && (
              <View className="flex-row flex-wrap gap-2 pt-2">
                {!appointment.patient.lastVisit && (
                  <View className="rounded-full px-2 py-0.5 bg-primary-500/10 border border-primary-500/30">
                    <Text className="text-xs text-neutral-800 font-medium">
                      Primeira consulta do paciente
                    </Text>
                  </View>
                )}

                {appointment.patient.tags.map((tag, index) => (
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

          <View className="px-4 gap-3">
            <Text className="text-neutral-800 text-lg font-semibold">Agendamento</Text>

            <View className="bg-transparent border border-neutral-500 rounded-2xl p-4 gap-3">
              <View className="flex-row items-center gap-3">
                <Calendar size={18} color={colors.primary[500]} />
                <Text className="text-neutral-800">
                  {format(appointment.scheduledFor, "dd/MM/yyyy")}
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Clock size={18} color={colors.primary[500]} />
                <Text className="text-neutral-800">
                  {format(appointment.scheduledFor, "HH:mm")}
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <MapPin size={18} color={colors.primary[500]} />
                <Text className="text-neutral-800">{appointment.unit.name}</Text>
              </View>
            </View>
          </View>

          <View className="px-4 gap-3">
            <Text className="text-neutral-800 text-lg font-semibold">Queixas</Text>

            {appointment.complaints && appointment.complaints.length > 0 ? (
              <View className="bg-transparent border border-neutral-500 rounded-2xl p-4 gap-2">
                {appointment.complaints.map((complaint, index) => (
                  <View key={index} className="flex-row gap-2 items-start">
                    <View className="w-2 h-2 rounded-full bg-primary-500 translate-y-1.5" />
                    <Text className="text-neutral-800 flex-1">{complaint}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="bg-transparent border border-neutral-500 rounded-2xl p-6">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center pt-4">
                  Nenhuma queixa registrada
                </Text>

                <Text className="text-neutral-600 text-center pt-2">
                  As queixas principais do paciente aparecerão aqui quando informadas durante a
                  consulta.
                </Text>
              </View>
            )}
          </View>

          <View className="px-4 gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-neutral-800 text-lg font-semibold">Prontuário</Text>

              <Link
                text="Ver prontuário completo"
                onPress={() =>
                  navigation.navigate("MedicalRecord", { patient: appointment.patient })
                }
              />
            </View>

            {appointment.diagnoses && appointment.diagnoses.length > 0 ? (
              <View className="bg-transparent border border-neutral-500 rounded-2xl p-4 gap-2">
                <Text className="text-neutral-800 font-medium">Diagnósticos</Text>

                <View className="gap-2">
                  {appointment.diagnoses.map((diagnosis, index) => (
                    <Text key={index} className="text-neutral-800">
                      {diagnosis}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <View className="bg-transparent border border-neutral-500 rounded-2xl p-6">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center pt-4">
                  Nenhum diagnóstico registrado
                </Text>

                <Text className="text-neutral-600 text-center pt-2">
                  Os diagnósticos médicos aparecerão aqui após a conclusão da consulta.
                </Text>
              </View>
            )}

            {appointment.patient?.note ? (
              <View className="bg-transparent border border-neutral-500 rounded-2xl p-4 gap-2">
                <Text className="text-neutral-800 font-medium">Notas</Text>

                <Text className="text-neutral-600">{appointment.patient.note}</Text>
              </View>
            ) : (
              <View className="bg-transparent border border-neutral-500 rounded-2xl p-6">
                <View className="w-full h-0.5 bg-neutral-700">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-800 font-medium text-base text-center pt-4">
                  Nenhuma nota registrada
                </Text>

                <Text className="text-neutral-600 text-center pt-2">
                  As observações e anotações do prontuário aparecerão aqui quando disponíveis.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {(appointment.status === "scheduled" || appointment.status === "completed") && (
        <View className="p-4 bg-neutral-100">
          <View className="flex-row gap-3">
            {appointment.status === "scheduled" && (
              <Button
                className={`flex-1 py-3 rounded-xl ${canStartAppointment() ? "bg-primary-500" : "bg-neutral-400"}`}
                onPress={() => navigation.navigate("Appointment", { appointment })}
                disabled={!canStartAppointment()}
              >
                <Text className="text-center text-white font-semibold">
                  {canStartAppointment() ? "Iniciar atendimento" : "Aguardando horário da consulta"}
                </Text>
              </Button>
            )}

            {appointment.status === "completed" && (
              <Button className="flex-1 bg-primary-500 py-3 rounded-xl">
                <Text className="text-center text-white font-semibold">Ver relatório</Text>
              </Button>
            )}
          </View>
        </View>
      )}
    </View>
  )
}
