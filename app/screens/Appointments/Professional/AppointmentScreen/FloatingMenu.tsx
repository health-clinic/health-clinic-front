import { ClipboardPlus, FilePlus, Pill, Plus, X } from "lucide-react-native"
import { ReactElement, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

interface FloatingMenuProps {
  openComplaintModal: () => void
  openDiagnosisModal: () => void
  openPrescriptionModal: () => void
}

export const FloatingMenu = ({
  openComplaintModal,
  openDiagnosisModal,
  openPrescriptionModal,
}: FloatingMenuProps): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <View className="absolute bottom-24 right-4 items-end">
      {expanded && (
        <View className="space-y-3 mb-4">
          <TouchableOpacity
            onPress={() => {
              setExpanded(false)
              openComplaintModal()
            }}
            className="bg-primary-500 p-3 rounded-2xl w-48 flex-row items-center justify-between"
          >
            <Text className="text-white font-semibold text-sm">Adicionar Queixa</Text>

            <ClipboardPlus size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setExpanded(false)
              openDiagnosisModal()
            }}
            className="bg-primary-500 p-3 rounded-2xl w-48 flex-row items-center justify-between"
          >
            <Text className="text-white font-semibold text-sm">Adicionar Diagnóstico</Text>

            <FilePlus size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setExpanded(false)
              openPrescriptionModal()
            }}
            className="bg-primary-500 p-3 rounded-2xl w-48 flex-row items-center justify-between"
          >
            <Text className="text-white font-semibold text-sm">Adicionar Prescrição</Text>

            <Pill size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        className="bg-primary-500 p-4 rounded-full shadow-lg"
      >
        {expanded ? <X size={24} color="#ffffff" /> : <Plus size={24} color="#ffffff" />}
      </TouchableOpacity>
    </View>
  )
}
