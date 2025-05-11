import { ErrorInfo, ReactElement } from "react"
import { ScrollView, Text, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/Button"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null

  onReset(): void
}

export const ErrorDetails = (props: ErrorDetailsProps): ReactElement => {
  const { t } = useTranslation()

  return (
    <View className="flex-1 justify-center bg-neutral-100 px-6 py-6">
      <View className="items-center gap-6">
        <MaterialCommunityIcons name="bug" size={64} color="#FF6B8B" />

        <Text className="text-xl font-bold text-neutral-900 text-center">
          {t("errorScreen:title")}
        </Text>

        <Text className="text-base text-neutral-700 text-center">
          {t("errorScreen:friendlySubtitle")}
        </Text>

        <ScrollView className="w-full bg-neutral-300 rounded-lg p-4 max-h-72 border border-neutral-400">
          <Text className="font-bold text-angry-500 mb-2">{props.error?.toString().trim()}</Text>

          <Text selectable className="text-xs text-neutral-700">
            {props.errorInfo?.componentStack?.trim()}
          </Text>
        </ScrollView>

        <Button className="bg-primary-500 w-full py-3 rounded-lg" onPress={props.onReset}>
          <Text className="text-center font-semibold text-neutral-900">
            {t("errorScreen:reset")}
          </Text>
        </Button>
      </View>
    </View>
  )
}
