import { TextInput } from "@/components/TextInput"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native"
import { Button } from "@/components/Button"
import { Text, View } from "react-native"
import { useState } from "react"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void
}

const schema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "Por favor, insira sua senha." }),
})

type FormData = z.infer<typeof schema>

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)

  const { control, setFocus, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState<FormData>({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    const field = Object.keys(errors)[0] as keyof FormData
    setFocus(field)
  }

  const hasEmailError = Boolean(errors.email)
  const hasPasswordError = Boolean(errors.password)

  return (
    <View className="flex-col gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasEmailError}>
              <TextInput.Icon icon={Mail} />

              <TextInput.Control
                ref={ref}
                placeholder="E-mail"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="email"
              />
            </TextInput.Root>

            {errors.email && (
              <Text className="text-angry-500 text-xs mt-1">{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasPasswordError}>
              <TextInput.Icon icon={LockKeyhole} />

              <TextInput.Control
                ref={ref}
                placeholder="Senha"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={isPasswordHidden}
                textContentType="password"
                autoComplete="password"
              />

              <TextInput.Action onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                <TextInput.Icon
                  icon={isPasswordHidden ? EyeOff : Eye}
                  hasError={hasPasswordError}
                />
              </TextInput.Action>
            </TextInput.Root>

            {errors.password && (
              <Text className="text-angry-500 text-xs mt-1">{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Button
        onPress={handleSubmit((data) => onSubmit(data.email, data.password), onError)}
        title="submit"
      >
        <Text className="text-base font-bold text-neutral-900">Entrar</Text>
      </Button>
    </View>
  )
}
