import { forwardRef } from "react"
import { TextInput, TextInputProps } from "react-native"

interface InputControlProps extends TextInputProps {}

export const TextInputControl = forwardRef<typeof TextInput, InputControlProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={`flex-1 text-lg text-neutral-900 placeholder:text-neutral-500 font-interMedium bg-transparent outline-none ${className}`}
        {...props}
      />
    )
  },
)
