/// <reference types="nativewind/types" />

declare module "react-native" {
  import * as ReactNative from "react-native"

  export const View: ReactNative.ComponentClass<ViewProps>
  export const Text: ReactNative.ComponentClass<TextProps>
  export const TextInput: ReactNative.ComponentClass<TextInputProps>
  export const Image: ReactNative.ComponentClass<ImageProps>
  export const ScrollView: ReactNative.ComponentClass<ScrollViewProps>
  export const TouchableOpacity: ReactNative.ComponentClass<TouchableOpacityProps>
  export const Pressable: ReactNative.ComponentClass<PressableProps>
  export const ActivityIndicator: ReactNative.ComponentClass<ActivityIndicatorProps>

  interface ViewProps {
    className?: string
  }

  interface TextProps {
    className?: string
  }

  interface TextInputProps {
    className?: string
  }

  interface ImageProps {
    className?: string
  }

  interface ScrollViewProps {
    className?: string
  }

  interface TouchableOpacityProps extends ReactNative.TouchableOpacityProps {
    className?: string
  }

  interface PressableProps {
    className?: string
  }

  interface ActivityIndicatorProps extends ReactNative.ActivityIndicatorProps {
    className?: string
  }
}
