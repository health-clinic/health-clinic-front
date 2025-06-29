import React, { FC, ReactElement, useState } from "react"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "@/components/TextInput"
import { ChevronLeft, Eye, EyeOff, KeyRound, LockKeyhole } from "lucide-react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/Button"
import { StepIndicator } from "@/components/StepIndicator"
import { useNavigation } from "@react-navigation/native"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"

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
  onBack: () => void
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  email,
  onSubmit,
  onBack,
}: ResetPasswordFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()

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
        <StepIndicator currentStep={3} totalSteps={3} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <KeyRound size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Nova senha</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Crie uma nova senha para sua conta. Ela deve ter pelo menos 8 caracteres.
          </Text>
        </View>

        <View className="flex-1 gap-4">
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
                  <Text className="text-angry-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      </View>

      <View className="flex-row gap-2 p-4">
        <Button onPress={onBack} className="flex-1 bg-transparent border border-primary-600">
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </Button>

        <Button
          onPress={handleSubmit(({ password }): void => onSubmit(email, password), onError)}
          className="flex-1"
        >
          <Text className="text-base font-bold text-neutral-900">Redefinir senha</Text>
        </Button>
      </View>
    </View>
  )
}
