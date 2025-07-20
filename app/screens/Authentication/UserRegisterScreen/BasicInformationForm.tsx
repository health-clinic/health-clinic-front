import { ReactElement, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { RegisterPayload } from "./RegisterForm"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { TextInput } from "@/components/TextInput"
import { ChevronLeft, Eye, EyeOff, LockKeyhole, Mail, User, UserPlus } from "lucide-react-native"
import { Button } from "@/components/Button"
import { StepIndicator } from "@/components/StepIndicator"
import { useNavigation } from "@react-navigation/native"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"

const createSchema = (isEditMode: boolean) => {
  const baseSchema = z.object({
    name: z.string().min(1, "Por favor, informe seu nome completo."),
    email: z.string().email("O e-mail digitado não é válido."),
    password: isEditMode
      ? z.string().optional()
      : z.string().min(1, "Por favor, informe uma senha."),
    confirmPassword: isEditMode
      ? z.string().optional()
      : z.string().min(1, "Por favor, confirme sua senha."),
  })

  return baseSchema.refine(
    (data) => {
      if (isEditMode && !data.password && !data.confirmPassword) {
        return true
      }

      if (data.password) {
        const hasMinLength = data.password.length >= 8
        const hasUpperCase = /[A-Z]/.test(data.password)
        const hasLowerCase = /[a-z]/.test(data.password)
        const hasNumber = /\d/.test(data.password)
        const hasSpecialChar = /[@$!%*?&\.\-_\#]/.test(data.password)

        if (!hasMinLength) {
          return false
        }
        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
          return false
        }
      }

      return data.password === data.confirmPassword
    },
    {
      message:
        "A senha deve ter no mínimo 8 caracteres com pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial. As senhas devem ser iguais.",
      path: ["confirmPassword"],
    },
  )
}

type FormData = z.infer<ReturnType<typeof createSchema>>

interface BasicInformationFormProps {
  initialValues?: Partial<RegisterPayload>
  onNext: (values: Partial<RegisterPayload>) => void
  onBack: () => void
  isEditMode?: boolean
}

export const BasicInformationForm = ({
  initialValues,
  onNext,
  onBack,
  isEditMode = false,
}: BasicInformationFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState<boolean>(true)

  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: {
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
      password: initialValues?.password ?? "",
      confirmPassword: initialValues?.confirmPassword ?? "",
    },
    resolver: zodResolver(createSchema(isEditMode)),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const hasError = (field: keyof FormData) =>
    (Object.keys(errors) as (keyof FormData)[]).includes(field)

  const role = initialValues?.role
  const totalSteps =
    role === "administrator" ? 3 : role === "patient" ? 5 : role === "professional" ? 4 : 3
  const currentStep = 2

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => (isEditMode ? navigation.goBack() : navigation.navigate("Login" as never))}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">
          {isEditMode ? "Editar perfil" : "Criar conta"}
        </Text>
      </View>

      <View className="flex-1 gap-6 p-4">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} role={role} />

        <View className="flex-col gap-2">
          <View className="flex-row items-center gap-2">
            <UserPlus size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">
              {isEditMode ? "Informações pessoais" : "Informações básicas"}
            </Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            {isEditMode
              ? "Atualize suas informações pessoais. Deixe os campos de senha em branco se não desejar alterá-la."
              : "Preencha os dados básicos para criar sua conta."}
          </Text>
        </View>

        <View className="flex-1 gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("name")}>
                  <TextInput.Icon icon={User} />

                  <TextInput.Control
                    ref={ref}
                    placeholder="Nome completo"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    textContentType="name"
                  />
                </TextInput.Root>

                {errors.name && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.name.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <View>
                <TextInput.Root hasError={hasError("email")}>
                  <TextInput.Icon
                    icon={Mail}
                    style={{
                      opacity: isEditMode ? 0.6 : 1,
                    }}
                  />

                  <TextInput.Control
                    ref={ref}
                    placeholder="E-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!isEditMode}
                    style={{
                      opacity: isEditMode ? 0.6 : 1,
                    }}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("password")}>
                  <TextInput.Icon icon={LockKeyhole} />

                  <TextInput.Control
                    placeholder={isEditMode ? "Nova senha (opcional)" : "Senha"}
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
                    placeholder={isEditMode ? "Confirmar nova senha" : "Confirmar senha"}
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

        <Button onPress={handleSubmit((data) => onNext(data), onError)} className="flex-1">
          <Text className="text-base font-bold text-neutral-900">Próximo</Text>
        </Button>
      </View>
    </View>
  )
}
