import { TextInput } from "@/components/TextInput"
import { BriefcaseMedical, ChevronLeft, Stethoscope } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactElement } from "react"
import { RegisterPayload } from "@/screens/Authentication/UserRegisterScreen/RegisterForm"
import { StepIndicator } from "@/components/StepIndicator"
import { useNavigation } from "@react-navigation/native"

// @ts-ignore
import tailwind from "./../../../../tailwind.config"

interface ProfessionalDetailsFormProps {
  initialValues?: Partial<RegisterPayload>
  onNext: (values: Partial<RegisterPayload>) => void
  onBack: () => void
  isEditMode?: boolean
}

const schema = z.object({
  crm: z.string().min(1, "Por favor, insira o CRM."),
  specialty: z.string().min(1, "Por favor, selecione uma especialidade."),
})

type FormData = z.infer<typeof schema>

export const ProfessionalDetailsForm = ({
  initialValues,
  onNext,
  onBack,
  isEditMode = false,
}: ProfessionalDetailsFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors
  const navigation = useNavigation()

  const specialtyItems = [
    { label: "Cardiologia", value: "Cardiologia" },
    { label: "Clínica Geral", value: "Clínica Geral" },
    { label: "Dermatologia", value: "Dermatologia" },
    { label: "Pediatria", value: "Pediatria" },
  ]

  const { control, setFocus, handleSubmit, setValue, reset } = useForm<FormData>({
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

  const role = initialValues?.role
  const totalSteps = 4
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
            <BriefcaseMedical size={24} color={colors.primary[600]} />

            <Text className="text-neutral-800 text-lg font-bold">Informações profissionais</Text>
          </View>

          <Text className="text-neutral-600 text-sm">
            Informe seus dados profissionais para validação.
          </Text>
        </View>

        <View className="flex-1 gap-4">
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
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("specialty")}>
                  <TextInput.Icon icon={Stethoscope} />

                  <TextInput.DropdownControl
                    value={value}
                    onValueChange={onChange}
                    items={specialtyItems}
                    placeholder="Especialidade"
                    hasError={hasError("specialty")}
                  />
                </TextInput.Root>

                {errors.specialty && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.specialty.message}</Text>
                )}
              </View>
            )}
          />
        </View>
      </View>

      <View className="flex-row gap-2 p-4">
        <TouchableOpacity
          onPress={onBack}
          className="flex-1 bg-transparent border border-primary-600 items-center py-4 rounded-xl"
        >
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit((data) => onNext(data), onError)}
          className="flex-1 bg-primary-600 items-center py-4 rounded-xl"
        >
          <Text className="text-base font-bold text-neutral-900">Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
