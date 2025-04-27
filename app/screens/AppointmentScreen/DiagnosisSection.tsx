import { ArrowRight } from "lucide-react-native"
import { forwardRef, ReactElement, useImperativeHandle, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { DiagnosisModal } from "@/screens/AppointmentScreen/DiagnosisModal"
import { Diagnosis } from "@/models/Diagosis"

interface DiagnosisSectionProps {
  diagnoses: Diagnosis[]
  onDiagnosisAdded: (diagnosis: Diagnosis[]) => void
}

export const DiagnosisSection = forwardRef(
  ({ diagnoses, onDiagnosisAdded }: DiagnosisSectionProps, ref): ReactElement => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const maxDiagnosesToShow = 5
    const displayedDiagnoses = diagnoses.slice(0, maxDiagnosesToShow)
    const hiddenDiagnosesCount = diagnoses.length - maxDiagnosesToShow

    useImperativeHandle(ref, () => ({
      openModal: () => setModalVisible(true),
    }))

    return (
      <View className="bg-neutral-300 rounded-2xl p-4 border border-primary-500 shadow-sm flex flex-col gap-4">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center flex-1 justify-between"
          activeOpacity={0.8}
        >
          <Text className="text-neutral-900 font-bold text-lg">Diagnósticos</Text>

          <ArrowRight size={20} color="#8A8A8A" />
        </TouchableOpacity>

        {diagnoses && diagnoses.length > 0 ? (
          <View className="flex-row flex-wrap gap-2">
            {displayedDiagnoses.map((diagnosis: Diagnosis, index: number) => (
              <View
                key={index}
                className="bg-neutral-400 rounded-full px-3 py-1 flex-row items-center gap-1"
              >
                <Text className="text-neutral-900 text-xs">
                  {diagnosis.title} ({diagnosis.code})
                </Text>
              </View>
            ))}

            {hiddenDiagnosesCount > 0 && (
              <View className="bg-primary-500 rounded-full px-3 py-1">
                <Text className="text-white text-xs">+{hiddenDiagnosesCount} outros</Text>
              </View>
            )}
          </View>
        ) : (
          <Text className="text-neutral-600 italic text-sm">Nenhum diagnóstico adicionado.</Text>
        )}

        <DiagnosisModal
          diagnoses={diagnoses}
          onDiagnosisAdded={onDiagnosisAdded}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      </View>
    )
  },
)
