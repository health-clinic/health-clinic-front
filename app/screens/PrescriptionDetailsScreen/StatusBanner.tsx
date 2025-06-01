import { ReactElement } from "react"
import { Text, View } from "react-native"
import { Prescription } from "@/models/Prescription"

interface StatusBannerProps {
  prescription: Prescription
  isActive: boolean
}

export const StatusBanner = ({ prescription, isActive }: StatusBannerProps): ReactElement => {
  return (
    <View className={`p-4 rounded-xl mb-6 ${isActive ? "bg-blue-500" : "bg-neutral-700"}`}>
      <Text className="text-white text-lg font-bold">
        {isActive ? "Prescrição Ativa" : "Prescrição Finalizada"}
      </Text>
      {isActive && (
        <Text className="text-white text-sm mt-1">
          Válida por mais{" "}
          {Math.ceil(
            (new Date(prescription.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000 - Date.now()) /
              (24 * 60 * 60 * 1000),
          )}{" "}
          dias
        </Text>
      )}
    </View>
  )
}
