import { FC, ReactElement } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

interface SwipeableProps {
  children: (animatedStyle: StyleProp<ViewStyle>) => ReactElement
  onSwipeComplete?: () => void
}

export const Swipeable: FC<SwipeableProps> = ({
  children,
  onSwipeComplete,
}: SwipeableProps): ReactElement => {
  const translateX = useSharedValue<number>(0)
  const offsetX = useSharedValue<number>(0)

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = offsetX.value + event.translationX
    })
    .onEnd(() => {
      if (translateX.value < -120) {
        offsetX.value = -150
        translateX.value = withSpring(-150)

        if (onSwipeComplete) {
          runOnJS(onSwipeComplete)()
        }
      } else {
        offsetX.value = 0
        translateX.value = withSpring(0)
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: interpolateColor(
      translateX.value,
      [-150, 0],
      ["rgba(220,38,38,0.8)", "rgba(0, 0, 0, 0)"],
    ),
  }))

  return <GestureDetector gesture={panGesture}>{children(animatedStyle)}</GestureDetector>
}
