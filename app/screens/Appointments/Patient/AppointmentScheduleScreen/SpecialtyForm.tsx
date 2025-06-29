import { FC, ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Baby, Check, ChevronLeft, Heart, Stethoscope, User } from "lucide-react-native"
import { StepIndicator } from "@/components/StepIndicator"
import { Specialty } from "@/models/Specialty"
import { Unit } from "@/models/Unit"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

interface SpecialtyFormProps {
  unit: Unit
  onNext: (specialty: Specialty) => void
  onBack: () => void
}

const getSpecialtyIcon = (specialtyName: string) => {
  switch (specialtyName.toLowerCase()) {
    case "pediatria":
      return Baby
    case "cardiologia":
      return Heart
    case "dermatologia":
      return User
    default:
      return Stethoscope
  }
}

export const SpecialtyForm: FC<SpecialtyFormProps> = ({
  unit,
  onNext,
  onBack,
}: SpecialtyFormProps): ReactElement => {
  const navigation = useNavigation()

  const colors = tailwind.theme.extend.colors

  const [specialties, setSpecialties] = useState<any[]>([])
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>()

  const fetchSpecialties = (): void => {
    const specialties = [
      {
        id: 1,
        name: "Pediatria",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Dermatologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Cardiologia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Clínica Geral",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    setSpecialties(specialties)
  }

  useEffect(() => {
    fetchSpecialties()
  }, [])

  const next = () => {
    if (!selectedSpecialty) {
      return
    }

    onNext(selectedSpecialty)
  }

  return (
    <View className="flex-1">
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
        <StepIndicator currentStep={2} totalSteps={5} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <Stethoscope size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Escolha uma especialidade</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Selecione a especialidade médica para sua consulta em {unit.name}
          </Text>
        </View>

        <View className="flex-1 gap-4">
          {specialties.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              <View className="flex-row flex-wrap justify-between gap-4">
                {specialties.map((specialty: any) => {
                  const IconComponent = getSpecialtyIcon(specialty.name)
                  const isSelected = selectedSpecialty?.id === specialty.id

                  return (
                    <TouchableOpacity
                      key={specialty.id}
                      onPress={() => setSelectedSpecialty(specialty)}
                      className={`bg-transparent border w-[48%] rounded-2xl p-4 flex-col items-center justify-center relative active:bg-neutral-700 ${
                        isSelected ? "border-primary-500" : "border-neutral-500"
                      }`}
                    >
                      <IconComponent size={40} color={colors.primary[500]} strokeWidth={2} />

                      <Text className="mt-3 font-medium text-neutral-900 text-base text-center">
                        {specialty.name}
                      </Text>

                      {isSelected && (
                        <View className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                          <Check size={16} color="#000000" />
                        </View>
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="flex flex-col gap-4 px-4">
              <View className="p-6 border border-neutral-500 rounded-2xl">
                <View className="w-full h-0.5 bg-neutral-700 mb-4">
                  <View className="w-0 h-full bg-primary-500" />
                </View>

                <Text className="text-neutral-900 font-medium text-base text-center">
                  Nenhuma especialidade encontrada
                </Text>

                <Text className="text-zinc-400 text-center mt-2">
                  Não há especialidades disponíveis para a unidade selecionada no momento.
                </Text>
              </View>
            </View>
          )}
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 bg-transparent border border-primary-600 items-center py-4 rounded-xl"
          >
            <Text className="text-base font-bold text-primary-600">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={next}
            disabled={!selectedSpecialty}
            className={`flex-1 items-center py-4 rounded-xl ${
              selectedSpecialty ? "bg-primary-600" : "bg-neutral-300"
            }`}
          >
            <Text
              className={`text-base font-bold ${
                selectedSpecialty ? "text-neutral-900" : "text-neutral-500"
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
