import { ReactElement } from "react"
import type { ModalProps } from "react-native"
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Button } from "@/components/Button"
import { Diagnosis } from "@/models/Diagosis"

interface DiagnosesModalProps extends ModalProps {
  diagnoses: Diagnosis[]
  onDiagnosisAdded: (updated: Diagnosis[]) => void
}

export const DiagnosisModal = ({
  diagnoses,
  onDiagnosisAdded,
  ...props
}: DiagnosesModalProps): ReactElement => {
  return (
    <Modal {...props} animationType="slide" transparent={true}>
      <Pressable className="flex-1 bg-black bg-opacity-50" onPress={props.onRequestClose} />

      <View
        className="absolute bottom-0 left-0 right-0 bg-neutral-100 rounded-t-3xl pt-4 px-6 pb-8"
        style={{ height: "70%" }}
      >
        <View className="w-12 h-1.5 bg-neutral-400 rounded-full self-center mb-6" />

        <Text className="text-neutral-900 font-bold text-lg mb-6 text-center">Diagnósticos</Text>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          {diagnoses.map((diagnosis, index) => (
            <View key={index} className="bg-neutral-300 rounded-2xl p-4 mb-4 space-y-2">
              <TextInput
                className="border-b border-neutral-400 text-neutral-900 text-sm pb-1"
                placeholder="Código CID-10 (ex: J20.9)"
                value={diagnosis.code}
                onChangeText={(text) => {
                  const updated = [...diagnoses]
                  updated[index].code = text
                  onDiagnosisAdded(updated)
                }}
              />

              <TextInput
                className="border-b border-neutral-400 text-neutral-900 text-sm pb-1"
                placeholder="Título do diagnóstico (ex: Bronquite Aguda)"
                value={diagnosis.title}
                onChangeText={(text) => {
                  const updated = [...diagnoses]
                  updated[index].title = text
                  onDiagnosisAdded(updated)
                }}
              />

              <View className="flex-row justify-around pt-2">
                {["Leve", "Moderada", "Severa"].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => {
                      const updated = [...diagnoses]
                      updated[index].severity = level as Diagnosis["severity"]
                      onDiagnosisAdded(updated)
                    }}
                    className={`px-3 py-1 rounded-full ${
                      diagnosis.severity === level ? "bg-primary-500" : "border border-neutral-400"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        diagnosis.severity === level ? "text-white" : "text-neutral-600"
                      }`}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => {
                  const updated = diagnoses.filter((_, i) => i !== index)
                  onDiagnosisAdded(updated)
                }}
                className="items-center pt-2"
              >
                <Text className="text-angry-500 text-xs">Excluir diagnóstico</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Button
          className="mt-2 py-2 rounded-xl bg-primary-500 active:opacity-90 shadow-sm"
          onPress={() =>
            onDiagnosisAdded([...diagnoses, { code: "", title: "", severity: "" } as Diagnosis])
          }
        >
          <Text className="text-white font-semibold text-sm text-center">
            Adicionar Diagnóstico
          </Text>
        </Button>
      </View>
    </Modal>
  )
}
