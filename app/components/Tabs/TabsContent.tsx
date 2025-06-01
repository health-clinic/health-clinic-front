import { FC, ReactElement, ReactNode } from "react"
import { View, ViewProps } from "react-native"

interface TabsContentProps extends ViewProps {
  children: ReactNode
}

export const TabsContent: FC<TabsContentProps> = ({
  children,
  ...props
}: TabsContentProps): ReactElement => {
  return (
    <View {...props} className="px-4">
      {children}
    </View>
  )
}
