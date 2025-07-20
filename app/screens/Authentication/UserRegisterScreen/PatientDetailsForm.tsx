import { ReactElement } from "react"
import { RegisterPayload } from "@/screens/Authentication/UserRegisterScreen/RegisterForm"
import { z } from "zod"
import { Text, TouchableOpacity, View } from "react-native"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { Calendar, ChevronLeft, IdCard, Phone, User } from "lucide-react-native"
import { Button } from "@/components/Button"
import { TextInput } from "@/components/TextInput"
import { StepIndicator } from "@/components/StepIndicator"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, isValid, parse } from "date-fns"
import { useNavigation } from "@react-navigation/native"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"
import { toZonedDateString } from "@/utils/date/convert"

interface PatientDetailsFormProps {
  initialValues?: Partial<RegisterPayload>
  onNext: (values: Partial<RegisterPayload>) => void
  onBack: () => void
  isEditMode?: boolean
}

const schema = z.object({
  document: z
    .string()
    .min(1, "Por favor, insira o CPF.")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido. Digite um CPF válido no formato 000.000.000-00.",
    ),
  phone: z
    .string()
    .min(1, "Por favor, insira o telefone.")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Telefone inválido. Digite um número válido no formato (99) 99999-9999.",
    ),
  birthdate: z
    .string()
    .min(1, "Por favor, insira a data de nascimento.")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida. Use o formato DD/MM/AAAA.")
    .transform((value) => {
      const parsed = parse(value, "dd/MM/yyyy", new Date())

      if (!isValid(parsed)) {
        throw new Error("Data inválida.")
      }

      return format(parsed, "yyyy-MM-dd")
    }),
})

type FormData = z.infer<typeof schema>

export const PatientDetailsForm = ({
  initialValues,
  onNext,
  onBack,
  isEditMode = false,
}: PatientDetailsFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()

  const formatBirthdateForDisplay = (birthdate?: string): string => {
    if (!birthdate) return ""

    try {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(birthdate)) {
        return birthdate
      }

      const parsed = parse(birthdate, "yyyy-MM-dd", new Date())
      if (isValid(parsed)) {
        return toZonedDateString(parsed)
      }

      const date = new Date(birthdate)
      if (isValid(date)) {
        return toZonedDateString(date)
      }
    } catch (error) {
      console.warn("Error formatting birthdate:", error)
    }

    return ""
  }

  const { control, setFocus, handleSubmit } = useForm<FormData>({
    defaultValues: {
      document: initialValues?.document ?? "",
      phone: initialValues?.phone ?? "",
      birthdate: formatBirthdateForDisplay(initialValues?.birthdate),
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const hasError = (field: keyof FormData) => !!errors[field]

  const role = initialValues?.role
  const totalSteps = role === "patient" ? 5 : 3
  const currentStep = 3

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() =>
            isEditMode
              ? navigation.navigate("Profile" as never)
              : navigation.navigate("Login" as never)
          }
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
            <User size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">
              {isEditMode ? "Informações pessoais" : "Informações do paciente"}
            </Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Preencha seus dados pessoais para completar o cadastro.
          </Text>
        </View>

        <View className="flex-1 gap-4">
          <Controller
            control={control}
            name="document"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("document")}>
                  <TextInput.Icon icon={IdCard} />

                  <TextInput.MaskedControl
                    ref={ref}
                    mask="999.999.999-99"
                    placeholder="CPF"
                    keyboardType="number-pad"
                    value={value ?? ""}
                    onChangeText={(masked) => onChange(masked)}
                    onBlur={onBlur}
                  />
                </TextInput.Root>

                {errors.document && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.document.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("phone")}>
                  <TextInput.Icon icon={Phone} />

                  <TextInput.MaskedControl
                    ref={ref}
                    mask="(99) 99999-9999"
                    placeholder="Telefone"
                    value={value ?? ""}
                    onChangeText={(masked) => onChange(masked)}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                  />
                </TextInput.Root>

                {errors.phone && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.phone.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="birthdate"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("birthdate")}>
                  <TextInput.Icon icon={Calendar} />

                  <TextInput.DateControl
                    value={value}
                    onChange={onChange}
                    placeholder="Data de nascimento"
                  />
                </TextInput.Root>

                {errors.birthdate && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.birthdate.message}</Text>
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
