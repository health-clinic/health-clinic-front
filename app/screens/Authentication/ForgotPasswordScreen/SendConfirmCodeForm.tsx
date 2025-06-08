import { FC, ReactElement } from "react"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextInput } from "@/components/TextInput"
import { User } from "lucide-react-native"
import { Text, View } from "react-native"
import { Button } from "@/components/Button"

const schema = z.object({ email: z.string().email("O e-mail digitado não é valido.") })

type FormData = z.infer<typeof schema>

interface SendConfirmCodeFormProps {
  onSubmit: (email: string) => void
}

export const SendConfirmCodeForm: FC<SendConfirmCodeFormProps> = ({
  onSubmit,
}: SendConfirmCodeFormProps): ReactElement => {
  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  })
  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>): void => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-neutral-900 mb-2">Esqueceu sua senha?</Text>

      <Text className="text-base text-neutral-700 mb-6">
        Digite seu e-mail cadastrado e enviaremos um código para redefinir sua senha.
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={!!errors.email}>
              <TextInput.Icon icon={User} />

              <TextInput.Control
                ref={ref}
                placeholder="Email"
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

      <Button onPress={handleSubmit((data) => onSubmit(data.email), onError)}>
        <Text className="text-neutral-900 font-bold text-base">Enviar código</Text>
      </Button>
    </View>
  )
}
