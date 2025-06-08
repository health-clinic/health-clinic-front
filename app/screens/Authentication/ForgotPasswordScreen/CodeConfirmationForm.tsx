import { FC, ReactElement } from "react"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Text, View } from "react-native"
import { Button } from "@/components/Button"
import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

const CELL_COUNT = 6

const schema = z.object({
  code: z.string().min(6, "O código deve ter 6 dígitos").max(6, "O código deve ter 6 dígitos"),
})

type FormData = z.infer<typeof schema>

interface CodeConfirmationFormProps {
  email: string
  onSubmit: (code: string) => void
  onResendCode: (code: string) => void
}

export const CodeConfirmationForm: FC<CodeConfirmationFormProps> = ({
  email,
  onSubmit,
  onResendCode,
}: CodeConfirmationFormProps): ReactElement => {
  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: { code: "" },
    resolver: zodResolver(schema),
  })
  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>): void => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const ref = useBlurOnFulfill({ value: "", cellCount: CELL_COUNT })

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-neutral-900 mb-2">Verifique seu e-mail</Text>

      <Text className="text-base text-neutral-700 mb-6">
        Enviamos um código para <Text className="font-bold">{email}</Text>. Insira-o abaixo para
        continuar.
      </Text>

      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => {
          const [props, getCellOnLayoutHandler] = useClearByFocusCell({
            value,
            setValue: onChange,
          })

          return (
            <View>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={onChange}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }: RenderCellOptions) => (
                  <Text
                    key={index}
                    className={`w-12 h-12 rounded-lg border-2 ${isFocused ? "border-primary-500 bg-neutral-200" : "border-neutral-500 bg-neutral-100"} text-center text-neutral-900 text-xl font-semibold leading-10 mx-1`}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />

              {errors.code && (
                <Text className="text-angry-500 text-xs mt-1">{errors.code.message}</Text>
              )}
            </View>
          )
        }}
      />

      <Button onPress={handleSubmit(({ code }): void => onSubmit(code), onError)}>
        <Text className="text-neutral-900 font-bold text-base">Continuar</Text>
      </Button>

      <Button className="bg-transparent border border-primary-600" onPress={onResendCode}>
        <Text className="text-neutral-900 font-bold text-base">Reenviar código</Text>
      </Button>
    </View>
  )
}
