import { ScrollView, View } from "react-native"
import { QuickAction, QuickActionProps } from "./QuickAction"
import { ReactElement } from "react"

interface QuickActionsProps {
  actions: QuickActionProps[]
}

export const QuickActions = ({ actions }: QuickActionsProps): ReactElement => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 px-6">
          {actions.map((action, index) => (
            <QuickAction key={index} icon={action.icon} label={action.label} special={action.special} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
