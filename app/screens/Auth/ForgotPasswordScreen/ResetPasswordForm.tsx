import { FC, ReactElement, useState } from "react"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { Text, View } from "react-native"
import { TextInput } from "@/components/TextInput"
import { Eye, EyeOff, LockKeyhole } from "lucide-react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/Button"

const schema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\-_\#])/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      ),
    confirmPassword: z.string().min(8, "Confirme sua senha (mínimo 8 caracteres)."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais. Verifique e tente novamente.",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof schema>

interface ResetPasswordFormProps {
  email: string
  onSubmit: (email: string, password: string) => void
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  email,
  onSubmit,
}: ResetPasswordFormProps): ReactElement => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState<boolean>(true)

  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const hasError = (field: keyof FormData) =>
    (Object.keys(errors) as (keyof FormData)[]).includes(field)

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-neutral-900 mb-2">Redefinir senha</Text>

      <Text className="text-base text-neutral-700 mb-6">
        Crie uma nova senha para sua conta. Ela deve ter pelo menos 8 caracteres.
      </Text>

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("password")}>
              <TextInput.Icon icon={LockKeyhole} />

              <TextInput.Control
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={isPasswordHidden}
                textContentType="newPassword"
                autoCapitalize="none"
              />

              <TextInput.Action onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                <TextInput.Icon
                  icon={isPasswordHidden ? EyeOff : Eye}
                  hasError={hasError("password")}
                />
              </TextInput.Action>
            </TextInput.Root>

            {errors.password && (
              <Text className="text-angry-500 text-xs mt-1">{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("confirmPassword")}>
              <TextInput.Icon icon={LockKeyhole} />

              <TextInput.Control
                placeholder="Confirmar senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={isConfirmPasswordHidden}
                textContentType="newPassword"
                autoCapitalize="none"
              />

              <TextInput.Action
                onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
              >
                <TextInput.Icon
                  icon={isConfirmPasswordHidden ? EyeOff : Eye}
                  hasError={hasError("confirmPassword")}
                />
              </TextInput.Action>
            </TextInput.Root>

            {errors.confirmPassword && (
              <Text className="text-angry-500 text-xs mt-1">{errors.confirmPassword.message}</Text>
            )}
          </View>
        )}
      />

      <Button onPress={handleSubmit(({ password }): void => onSubmit(email, password), onError)}>
        <Text className="text-neutral-900 font-bold text-base">Redefinir senha</Text>
      </Button>
    </View>
  )
}
