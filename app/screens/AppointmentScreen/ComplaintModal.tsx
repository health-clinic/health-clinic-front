import { ReactElement } from "react"
import type { ModalProps } from "react-native"
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Button } from "@/components/Button"
import { Trash2 } from "lucide-react-native"

interface ComplaintModalProps extends ModalProps {
  complaints: string[]
  onComplaintAdded: (complaints: string[]) => void
}

export const ComplaintModal = ({
  complaints,
  onComplaintAdded,
  ...props
}: ComplaintModalProps): ReactElement => {
  return (
    <Modal {...props} animationType="slide" transparent={true}>
      <Pressable className="flex-1 bg-black bg-opacity-50" onPress={props.onRequestClose} />

      <View
        className="absolute bottom-0 left-0 right-0 bg-neutral-100 rounded-t-3xl pt-4 px-6 pb-8"
        style={{ height: "50%" }}
      >
        <View className="w-12 h-1.5 bg-neutral-400 rounded-full self-center mb-6" />

        <Text className="text-neutral-900 font-bold text-lg mb-6 text-center">Queixas</Text>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          {complaints.map((complaint, index) => (
            <View
              key={index}
              className="flex-row items-center bg-neutral-300 rounded-2xl px-4 py-3 mb-3"
            >
              <TextInput
                className="flex-1 text-neutral-900 text-sm"
                placeholder="Digite a queixa"
                value={complaint}
                onChangeText={(text) => {
                  const updated = [...complaints]
                  updated[index] = text
                  onComplaintAdded(updated)
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  const updated = complaints.filter((_, i) => i !== index)
                  onComplaintAdded(updated)
                }}
                className="pl-2"
              >
                <Trash2 size={18} color="#FF4D4F" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Button
          className="mt-2 py-2 rounded-xl bg-primary-500 active:opacity-90 shadow-sm"
          onPress={() => onComplaintAdded([...complaints, ""])}
        >
          <Text className="text-white font-semibold text-sm text-center">Adicionar</Text>
        </Button>
      </View>
    </Modal>
  )
}
