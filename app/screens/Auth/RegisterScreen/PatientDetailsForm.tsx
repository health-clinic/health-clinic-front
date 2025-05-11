import { ReactElement } from "react"
import { RegisterPayload } from "@/screens/Auth/RegisterScreen/RegisterForm"
import { z } from "zod"
import { Text, View } from "react-native"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { Calendar, IdCard, Phone } from "lucide-react-native"
import { Button } from "@/components/Button"
import { TextInput } from "@/components/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"

interface PatientDetailsFormProps {
  initialValues?: Partial<RegisterPayload>
  onNext: (values: Partial<RegisterPayload>) => void
  onBack: () => void
}

const schema = z.object({
  document: z
    .string()
    .min(1, "Por favor, insira o CPF.")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido. Digite um CPF válido no formato 000.000.000-00."),
  phone: z
    .string()
    .min(1, "Por favor, insira o telefone.")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido. Digite um número válido no formato (99) 99999-9999."),
  birthdate: z
    .string()
    .min(1, "Por favor, insira a data de nascimento.")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida. Use o formato DD/MM/AAAA."),
})

type FormData = z.infer<typeof schema>

export const PatientDetailsForm = ({
  initialValues,
  onNext,
  onBack,
}: PatientDetailsFormProps): ReactElement => {
  const { control, setFocus, handleSubmit } = useForm<FormData>({
    defaultValues: {
      document: initialValues?.document ?? "",
      phone: initialValues?.phone ?? "",
      birthdate: initialValues?.birthdate ?? "",
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const hasError = (field: keyof FormData) => !!errors[field]

  return (
    <View className="flex-col gap-4">
      <Text className="text-lg font-medium text-white mb-4 text-center">
        Informações do Paciente
      </Text>

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
