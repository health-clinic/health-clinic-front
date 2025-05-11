import { ReactElement, useState } from "react"
import { Text, View } from "react-native"
import { RegisterPayload } from "./RegisterForm"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { TextInput } from "@/components/TextInput"
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react-native"
import { Button } from "@/components/Button"

const schema = z
  .object({
    name: z.string().min(1, "Por favor, informe seu nome completo."),
    email: z.string().email("O e-mail digitado não é válido."),
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

interface BasicInformationFormProps {
  initialValues?: Partial<RegisterPayload>
  onNext: (values: Partial<RegisterPayload>) => void
  onBack: () => void
}

export const BasicInformationForm = ({
  initialValues,
  onNext,
  onBack,
}: BasicInformationFormProps): ReactElement => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState<boolean>(true)

  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: {
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
      password: initialValues?.password ?? "",
      confirmPassword: initialValues?.confirmPassword ?? "",
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const hasError = (field: keyof FormData) => (Object.keys(errors) as (keyof FormData)[]).includes(field)

  return (
    <View className="flex-col gap-4">
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
              <TextInput.Icon icon={Mail} />
              
              <TextInput.Control
                ref={ref}
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                keyboardType="email-address"
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
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={isPasswordHidden}
                textContentType="newPassword"
                autoCapitalize="none"
              />
              
              <TextInput.Action onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                <TextInput.Icon icon={isPasswordHidden ? EyeOff : Eye} hasError={hasError("password")} />
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

              <TextInput.Action onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}>
                <TextInput.Icon icon={isConfirmPasswordHidden ? EyeOff : Eye} hasError={hasError("confirmPassword")} />
              </TextInput.Action>
            </TextInput.Root>
            
            {errors.confirmPassword && (
              <Text className="text-angry-500 text-xs mt-1">{errors.confirmPassword.message}</Text>
            )}
          </View>
        )}
      />

      <View className="flex-row gap-4 mt-4">
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
