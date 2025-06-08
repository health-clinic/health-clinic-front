import { FC, ReactElement, ReactNode } from "react"
import { ScrollView, View, ViewProps } from "react-native"

interface TabsRootProps extends ViewProps {
  children: ReactNode
  showsHorizontalScrollIndicator?: boolean
}

export const TabsRoot: FC<TabsRootProps> = ({
  children,
  showsHorizontalScrollIndicator = false,
  className,
  ...props
}: TabsRootProps): ReactElement => {
  return (
    <View {...props} className={`px-4 ${className}`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        contentContainerClassName="flex-row gap-2"
      >
        {children}
      </ScrollView>
    </View>
  )
}
