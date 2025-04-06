import React, { FC, ReactNode } from "react"
import { View, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"

interface HealthCardProps {
  children: ReactNode
  className?: string
  onPress?: () => void
}

export const HealthCard: FC<HealthCardProps> = ({ children, className, onPress }) => {
  const Container = onPress ? TouchableOpacity : View

  return (
    <Container className={`bg-white rounded-2xl p-4 mb-4 elevation-2 ${className || ""}`} onPress={onPress}>
      {children}
    </Container>
  )
}

export const HealthCardTitle: FC<{ title: string; className?: string }> = ({ title, className }) => (
  <Text className={`text-lg font-bold mb-2 text-[#333333] ${className || ""}`}>{title}</Text>
)

export const HealthCardContent: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <View className={`mt-2 ${className || ""}`}>{children}</View>
