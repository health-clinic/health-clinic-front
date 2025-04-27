import { ReactElement } from "react"
import type { ModalProps } from "react-native"
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Button } from "@/components/Button"
import { Prescription } from "@/models/Prescription/prescription.model"

interface PrescriptionModalProps extends ModalProps {
  prescriptions: Prescription[]
  onPrescriptionAdded: (prescriptions: Prescription[]) => void
}

export const PrescriptionModal = ({
  prescriptions,
  onPrescriptionAdded,
  ...props
}: PrescriptionModalProps): ReactElement => {
  return (
    <Modal {...props} animationType="slide" transparent={true}>
      <Pressable className="flex-1 bg-black bg-opacity-50" onPress={props.onRequestClose} />

      <View
        className="absolute bottom-0 left-0 right-0 bg-neutral-100 rounded-t-3xl pt-4 px-6 pb-8"
        style={{ height: "70%" }}
      >
        <View className="w-12 h-1.5 bg-neutral-400 rounded-full self-center mb-6" />

        <Text className="text-neutral-900 font-bold text-lg mb-6 text-center">Prescrições</Text>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          {prescriptions.map((prescription, index) => (
            <View key={index} className="bg-neutral-300 rounded-2xl p-4 mb-4 space-y-2">
              <TextInput
                className="border-b border-neutral-400 text-neutral-900 text-sm pb-1"
                placeholder="Nome do medicamento"
                value={prescription.name}
                onChangeText={(text) => {
                  const updated = [...prescriptions]
                  updated[index].name = text
                  onPrescriptionAdded(updated)
                }}
              />

              <TextInput
                className="border-b border-neutral-400 text-neutral-900 text-sm pb-1"
                placeholder="Dosagem (ex: 500mg)"
                value={prescription.dosage}
                onChangeText={(text) => {
                  const updated = [...prescriptions]
                  updated[index].dosage = text
                  onPrescriptionAdded(updated)
                }}
              />

              <TextInput
                className="border-b border-neutral-400 text-neutral-900 text-sm pb-1"
                placeholder="Frequência (ex: 2x ao dia)"
                value={prescription.frequency}
                onChangeText={(text) => {
                  const updated = [...prescriptions]
                  updated[index].frequency = text
                  onPrescriptionAdded(updated)
                }}
              />

              <TextInput
                className="border-b border-neutral-400 text-neutral-900 text-sm pb-1"
                placeholder="Duração (ex: 7 dias)"
                value={prescription.duration}
                onChangeText={(text) => {
                  const updated = [...prescriptions]
                  updated[index].duration = text
                  onPrescriptionAdded(updated)
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  const updated = prescriptions.filter((_, i) => i !== index)
                  onPrescriptionAdded(updated)
                }}
                className="items-center pt-2"
              >
                <Text className="text-angry-500 text-xs">Excluir prescrição</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Button
          className="mt-2 py-2 rounded-xl bg-primary-500 active:opacity-90 shadow-sm"
          onPress={() =>
            onPrescriptionAdded([
              ...prescriptions,
              { name: "", dosage: "", frequency: "", duration: "" },
            ])
          }
        >
          <Text className="text-white font-semibold text-sm text-center">Adicionar Prescrição</Text>
        </Button>
      </View>
    </Modal>
  )
}
