import React, { FC, ReactElement } from "react"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Text, TouchableOpacity, View } from "react-native"
import { Button } from "@/components/Button"
import { StepIndicator } from "@/components/StepIndicator"
import { ChevronLeft, KeyRound } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { CodeField, Cursor, RenderCellOptions } from "react-native-confirmation-code-field"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"

const CELL_COUNT = 6

const schema = z.object({
  code: z.string().min(6, "O código deve ter 6 dígitos").max(6, "O código deve ter 6 dígitos"),
})

type FormData = z.infer<typeof schema>

interface CodeConfirmationFormProps {
  email: string
  onSubmit: (code: string) => void
  onResendCode: (code: string) => void
  onBack: () => void
}

export const CodeConfirmationForm: FC<CodeConfirmationFormProps> = ({
  email,
  onSubmit,
  onResendCode,
  onBack,
}: CodeConfirmationFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()

  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: { code: "" },
    resolver: zodResolver(schema),
  })
  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>): void => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login" as never)}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">Esqueci minha senha</Text>
      </View>

      <View className="flex-1 gap-6 p-4">
        <StepIndicator currentStep={2} totalSteps={3} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <KeyRound size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Código de verificação</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Digite o código de 6 dígitos enviado para {email}.
          </Text>
        </View>

        <View className="flex-1 gap-4">
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => {
              return (
                <View>
                  <CodeField
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
                      >
                        {symbol || (isFocused && <Cursor />)}
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

          <View className="items-center gap-3">
            <Text className="text-neutral-500 text-sm text-center">Não recebeu o código?</Text>

            <Button onPress={onResendCode} className="w-full">
              <Text className={`text-base font-bold text-neutral-900`}>Reenviar código</Text>
            </Button>
          </View>
        </View>
      </View>

      <View className="flex-row gap-2 p-4">
        <Button onPress={onBack} className="flex-1 bg-transparent border border-primary-600">
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </Button>

        <Button
          onPress={handleSubmit(({ code }): void => onSubmit(code), onError)}
          className="flex-1"
        >
          <Text className="text-base font-bold text-neutral-900">Continuar</Text>
        </Button>
      </View>
    </View>
  )
}
