import { TextInput } from "@/components/TextInput"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native"
import { Button } from "@/components/Button"
import { Text, View } from "react-native"
import { useState } from "react"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { showErrorToast } from "@/components/toast"
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
    const message = Object.values(errors)[0]?.message
    const field = Object.keys(errors)[0] as keyof FormData

    setFocus(field)
    showErrorToast(message)
  }

  const hasEmailError = (Object.keys(errors)[0] as keyof FormData) === "email"

  const hasPasswordError = (Object.keys(errors)[0] as keyof FormData) === "password"

  return (
    <View className="flex-col gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, ref, value } }) => (
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
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput.Root hasError={hasPasswordError}>
            <TextInput.Icon icon={LockKeyhole} />

            <TextInput.Control
              placeholder="Senha"
              value={value ?? ""}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={isPasswordHidden}
              textContentType="password"
              autoComplete="password"
            />

            <TextInput.Action onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
              <TextInput.Icon icon={isPasswordHidden ? EyeOff : Eye} />
            </TextInput.Action>
          </TextInput.Root>
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
