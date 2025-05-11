import { ForwardedRef, forwardRef, ReactElement } from "react"
import { StyleSheet, StyleProp, TextStyle } from "react-native"
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text"
import tailwindConfig from '../../../tailwind.config.js'

interface TextInputMaskedControlProps extends MaskedTextInputProps {
  style?: StyleProp<TextStyle>
}

const defaultStyles = StyleSheet.create({
  maskedInput: {
    flex: 1,
    fontSize: 18,
    color: tailwindConfig.theme.extend.colors.neutral[900],
    backgroundColor: 'transparent',
    fontFamily: 'Inter-Medium',
  },
})

export const TextInputMaskedControl = forwardRef<
  typeof MaskedTextInput,
  TextInputMaskedControlProps
>(({ style, ...props }: TextInputMaskedControlProps, ref: ForwardedRef<typeof MaskedTextInput>): ReactElement => {
  return (
    <MaskedTextInput
      ref={ref}
      style={[defaultStyles.maskedInput, style]}
      placeholderTextColor={tailwindConfig.theme.extend.colors.neutral[500]}
      {...props}
    />
  )
})
