import { ReactElement } from "react"
import { Text, View } from "react-native"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  role?: string
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps): ReactElement => {
  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View key={index} className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              index < currentStep ? "bg-primary-600" : "bg-gray-600"
            }`}
          >
            <Text className="text-neutral-900 font-medium">{index + 1}</Text>
          </View>

          {index < totalSteps - 1 && (
            <View
              className={`w-12 h-0.5 ${index < currentStep - 1 ? "bg-primary-600" : "bg-gray-600"}`}
            />
          )}
        </View>
      ))}
    </View>
  )
}
