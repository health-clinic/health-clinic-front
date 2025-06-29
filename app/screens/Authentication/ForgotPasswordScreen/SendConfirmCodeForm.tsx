import React, { FC, ReactElement } from "react"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextInput } from "@/components/TextInput"
import { ChevronLeft, KeyRound, Mail } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { Button } from "@/components/Button"
import { StepIndicator } from "@/components/StepIndicator"
import { useNavigation } from "@react-navigation/native"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"

const schema = z.object({ email: z.string().email("O e-mail digitado não é valido.") })

type FormData = z.infer<typeof schema>

interface SendConfirmCodeFormProps {
  onSubmit: (email: string) => void
  onBack: () => void
}

export const SendConfirmCodeForm: FC<SendConfirmCodeFormProps> = ({
  onSubmit,
  onBack,
}: SendConfirmCodeFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()

  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: { email: "" },
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
        <StepIndicator currentStep={1} totalSteps={3} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <KeyRound size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Recuperar senha</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Informe seu e-mail para receber o código de verificação.
          </Text>
        </View>

        <View className="flex-1 gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={!!errors.email}>
                  <TextInput.Icon icon={Mail} />

                  <TextInput.Control
                    ref={ref}
                    placeholder="E-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </TextInput.Root>

                {errors.email && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.email.message}</Text>
                )}
              </View>
            )}
          />
        </View>
      </View>

      <View className="p-4">
        <Button onPress={handleSubmit((data) => onSubmit(data.email), onError)} className="w-full">
          <Text className="text-neutral-900 font-bold text-base">Enviar código</Text>
        </Button>
      </View>
    </View>
  )
}
