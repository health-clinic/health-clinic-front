import { ForwardedRef, forwardRef, ReactElement, useState } from "react"
import { Pressable, Text, View, ViewProps } from "react-native"
import { cn } from "@/utils/cn"
import DateTimePicker from "@react-native-community/datetimepicker"

interface TextInputDateControlProps extends ViewProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const TextInputDateControl = forwardRef<typeof View, TextInputDateControlProps>(
  (
    {
      value,
      onChange,
      placeholder = "Selecione uma data",
      className,
      ...props
    }: TextInputDateControlProps,
    ref: ForwardedRef<any>,
  ): ReactElement => {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const formatDate = (date: Date | null): string => {
      if (!date) return ""

      return date.toLocaleDateString("pt-BR")
    }

    return (
      <>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className={cn("flex-1 justify-center", className)}
          ref={ref}
          {...props}
        >
          <Text
            className={cn(
              "text-lg font-interMedium",
              value ? "text-neutral-900" : "text-neutral-500",
            )}
          >
            {value || placeholder}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={value ? new Date(value.split("/").reverse().join("-")) : new Date()}
            display="spinner"
            onChange={(event, date) => {
              setShowDatePicker(false)

              onChange(formatDate(date))
            }}
          />
        )}
      </>
    )
  },
)
