import { forwardRef, ReactElement, useImperativeHandle, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { ArrowRight } from "lucide-react-native"
import { ComplaintModal } from "@/screens/AppointmentScreen/ComplaintModal"

interface ComplaintSectionProps {
  complaints: string[]
  onComplaintAdded: (complaints: string[]) => void
}

export const ComplaintSection = forwardRef(
  ({ complaints, onComplaintAdded }: ComplaintSectionProps, ref): ReactElement => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const maxComplaintsToShow = 5
    const displayedComplaints = complaints.slice(0, maxComplaintsToShow)
    const hiddenComplaintsCount = complaints.length - maxComplaintsToShow

    useImperativeHandle(ref, () => ({
      openModal: () => setModalVisible(true),
    }))

    return (
      <View className="bg-neutral-200 rounded-2xl p-4 border border-primary-500 shadow-sm flex flex-col gap-4">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center flex-1 justify-between"
          activeOpacity={0.8}
        >
          <Text className="text-neutral-900 font-bold text-lg">Queixas</Text>

          <ArrowRight size={20} color="#8A8A8A" />
        </TouchableOpacity>

        {complaints && complaints.length > 0 ? (
          <View className="flex-row flex-wrap gap-2">
            {displayedComplaints.map((complaint: string, index: number) => (
              <View key={index} className="bg-neutral-400 rounded-full px-3 py-1">
                <Text className="text-neutral-900 text-xs">{complaint}</Text>
              </View>
            ))}

            {hiddenComplaintsCount > 0 && (
              <View className="bg-primary-500 rounded-full px-3 py-1">
                <Text className="text-white text-xs">+{hiddenComplaintsCount} outros</Text>
              </View>
            )}
          </View>
        ) : (
          <Text className="text-neutral-600 italic text-sm">Nenhuma queixa adicionada.</Text>
        )}

        <ComplaintModal
          complaints={complaints}
          onComplaintAdded={onComplaintAdded}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      </View>
    )
  },
)
