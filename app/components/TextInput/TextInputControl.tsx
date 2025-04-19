import { TextInput, TextInputProps } from "react-native"
import { cn } from "@/utils/cn"

interface InputControlProps extends TextInputProps {}

export const TextInputControl = ({ ...props }: InputControlProps) => {
  return (
    <TextInput
      className={cn(
        "flex-1 text-base text-white placeholder:text-neutral-600 font-interRegular bg-transparent outline-none",
        props.className,
      )}
      {...props}
    />
  )
}
