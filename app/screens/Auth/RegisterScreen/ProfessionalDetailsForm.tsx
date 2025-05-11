import { TextInput } from "@/components/TextInput"
import { BriefcaseMedical, Stethoscope } from "lucide-react-native"
import { Button } from "@/components/Button"
import { Text, View } from "react-native"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactElement } from "react"
import { RegisterPayload } from "@/screens/Auth/RegisterScreen/RegisterForm"

interface ProfessionalDetailsFormProps {
  initialValues?: Partial<RegisterPayload>
  onNext: (values: Partial<RegisterPayload>) => void
  onBack: () => void
}

const schema = z.object({
  crm: z.string().min(1, "Por favor, insira o CRM."),
  specialty: z.string().min(1, "Por favor, insira a especialidade."),
})

type FormData = z.infer<typeof schema>

export const ProfessionalDetailsForm = ({
  initialValues,
  onNext,
  onBack,
}: ProfessionalDetailsFormProps): ReactElement => {
  const { control, setFocus, handleSubmit } = useForm<FormData>({
    defaultValues: {
      crm: initialValues?.crm ?? "",
      specialty: initialValues?.specialty ?? "",
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
        Informações Profissionais
      </Text>

      <Controller
        control={control}
        name="crm"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("crm")}> 
              <TextInput.Icon icon={BriefcaseMedical} />
              
              <TextInput.Control
                ref={ref}
                placeholder="CRM"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="characters"
              />
            </TextInput.Root>
            
            {errors.crm && (
              <Text className="text-angry-500 text-xs mt-1">{errors.crm.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specialty"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("specialty")}> 
              <TextInput.Icon icon={Stethoscope} />
              
              <TextInput.Control
                ref={ref}
                placeholder="Especialidade"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </TextInput.Root>
            
            {errors.specialty && (
              <Text className="text-angry-500 text-xs mt-1">{errors.specialty.message}</Text>
            )}
          </View>
        )}
      />

      <View className="flex-row justify-between mt-4">
        <Button onPress={onBack}>
          <Text className="text-base font-bold text-neutral-900">Voltar</Text>
        </Button>
        <Button onPress={handleSubmit((data) => onNext(data), onError)}>
          <Text className="text-base font-bold text-neutral-900">Próximo</Text>
        </Button>
      </View>
    </View>
  )
}
