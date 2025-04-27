import { Prescription } from "@/models/Prescription/prescription.model"
import { forwardRef, ReactElement, useImperativeHandle, useState } from "react"
import { Text, View } from "react-native"
import { Button } from "@/components/Button"
import { PrescriptionModal } from "@/screens/AppointmentScreen/PrescriptionModal"

interface PrescriptionSectionProps {
  prescriptions: Prescription[]
  onPrescriptionAdded: (prescriptions: Prescription[]) => void
}

export const PrescriptionSection = forwardRef(
  ({ prescriptions, onPrescriptionAdded }: PrescriptionSectionProps, ref): ReactElement => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const maxPrescriptionsToShow = 3
    const displayedPrescriptions = prescriptions.slice(0, maxPrescriptionsToShow)
    const hiddenPrescriptionsCount = prescriptions.length - maxPrescriptionsToShow

    useImperativeHandle(ref, () => ({
      openModal: () => setModalVisible(true),
    }))

    return (
      <View className="bg-neutral-200 rounded-2xl p-4 border border-primary-500 shadow-sm flex flex-col gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-neutral-900 font-bold text-lg">Prescrições</Text>
        </View>

        {prescriptions.length > 0 ? (
          <>
            {displayedPrescriptions.map((prescription: Prescription, index: number) => (
              <View
                key={index}
                className="bg-neutral-300 rounded-2xl border border-primary-500 p-4 flex flex-col gap-1 shadow-sm"
              >
                <View className="flex-row justify-between">
                  <View className="flex-1">
                    <Text className="text-neutral-900 font-bold text-base">
                      {prescription.name}
                    </Text>
                    <Text className="text-neutral-700 text-sm">
                      {prescription.dosage} • {prescription.frequency}
                    </Text>
                  </View>
                  <Text className="text-neutral-600 text-xs">{prescription.duration}</Text>
                </View>
              </View>
            ))}

            {hiddenPrescriptionsCount > 0 && (
              <Button
                onPress={() => setModalVisible(true)}
                className="bg-primary-500 rounded-2xl p-2 items-center"
              >
                <Text className="text-white font-semibold text-xs">Expandir prescrições</Text>
              </Button>
            )}
          </>
        ) : (
          <Text className="text-neutral-600 italic text-sm">Nenhuma prescrição adicionada.</Text>
        )}

        <PrescriptionModal
          prescriptions={prescriptions}
          onPrescriptionAdded={onPrescriptionAdded}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      </View>
    )
  },
)
