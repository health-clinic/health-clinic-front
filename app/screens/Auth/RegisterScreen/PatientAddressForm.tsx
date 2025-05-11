import { TextInput } from "@/components/TextInput"
import { Building2, Globe, House, Layers, MapPin, Route } from "lucide-react-native"
import { Button } from "@/components/Button"
import { Text, View } from "react-native"
import { z } from "zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { showErrorToast } from "@/components/toast"
import { ReactElement } from "react"
import { RegisterPayload } from "@/screens/Auth/RegisterScreen/RegisterForm"
import { api } from "@/services/api/address.api"
import { createAddressApi } from "@/services/address/address.api"

interface PatientAddressFormProps {
  initialValues?: Partial<RegisterPayload["address"]>
  onNext: (values: Partial<RegisterPayload["address"]>) => void
  onBack: () => void
}

const schema = z.object({
  zipCode: z
    .string()
    .min(1, "Por favor, insira o CEP.")
    .regex(/^\d{5}-\d{3}$/, "O CEP digitado não é válido."),
  street: z
    .string()
    .min(1, "Por favor, insira a rua."),
  number: z
    .string()
    .min(1, "Por favor, insira o número."),
  district: z
    .string()
    .min(1, "Por favor, insira o bairro."),
  city: z
    .string()
    .min(1, "Por favor, insira a cidade."),
  state: z
    .string()
    .min(1, "Por favor, insira o UF.")
    .regex(/^[A-Z]{2}$/, "O UF digitado não é válido. Use apenas letras maiúsculas."),
})

type FormData = z.infer<typeof schema>

export const PatientAddressForm = ({
  initialValues,
  onNext,
  onBack,
}: PatientAddressFormProps): ReactElement => {
  const { control, setFocus, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      zipCode: initialValues?.zipCode ?? "",
      street: initialValues?.street ?? "",
      number: initialValues?.number ?? "",
      district: initialValues?.district ?? "",
      city: initialValues?.city ?? "",
      state: initialValues?.state ?? "",
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const fetchAddress = async (): Promise<void> => {
    try {
      const cep = watch("zipCode").replace(/\D/g, "")

      const { kind, address } = await createAddressApi(api).findByCep(cep)
      if (kind !== "ok") {
        showErrorToast(
          "Não foi possível encontrar o endereço. Verifique se o CEP está correto e tente novamente.",
        )

        return
      }

      setValue("street", address.street)
      setValue("district", address.district)
      setValue("city", address.city)
      setValue("state", address.state)
    } catch (error) {
      console.error(error)

      showErrorToast("Ops! Tivemos um problema ao buscar o endereço. Tente novamente em instantes.")
    }
  }

  const hasError = (field: keyof FormData) => !!errors[field]

  return (
    <View className="flex-col gap-4">
      <Text className="text-lg font-medium text-white mb-4 text-center">Endereço</Text>

      <Controller
        control={control}
        name="zipCode"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("zipCode")}> 
              <TextInput.Icon icon={MapPin} />
              
              <TextInput.MaskedControl
                ref={ref}
                mask="99999-999"
                placeholder="CEP"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={() => {
                  onBlur()
                  fetchAddress()
                }}
                keyboardType="number-pad"
              />
            </TextInput.Root>
            
            {errors.zipCode && (
              <Text className="text-angry-500 text-xs mt-1">{errors.zipCode.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="street"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("street")}> 
              <TextInput.Icon icon={Route} />
              
              <TextInput.Control
                ref={ref}
                placeholder="Rua"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </TextInput.Root>
            
            {errors.street && (
              <Text className="text-angry-500 text-xs mt-1">{errors.street.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="number"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("number")}> 
              <TextInput.Icon icon={House} />
              
              <TextInput.Control
                ref={ref}
                placeholder="Número"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="number-pad"
              />
            </TextInput.Root>
            
            {errors.number && (
              <Text className="text-angry-500 text-xs mt-1">{errors.number.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="district"
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <View>
            <TextInput.Root hasError={hasError("district")}> 
              <TextInput.Icon icon={Layers} />
              
              <TextInput.Control
                ref={ref}
                placeholder="Bairro"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </TextInput.Root>
            
            {errors.district && (
              <Text className="text-angry-500 text-xs mt-1">{errors.district.message}</Text>
            )}
          </View>
        )}
      />

      <View className="flex-row gap-4">
        <View className="flex-1">
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("city")}> 
                  <TextInput.Icon icon={Building2} />
                  
                  <TextInput.Control
                    ref={ref}
                    placeholder="Cidade"
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </TextInput.Root>
                
                {errors.city && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.city.message}</Text>
                )}
              </View>
            )}
          />
        </View>

        <View style={{ width: 100 }}>
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("state")}> 
                  <TextInput.Icon icon={Globe} />
                  
                  <TextInput.Control
                    ref={ref}
                    placeholder="UF"
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    maxLength={2}
                    autoCapitalize="characters"
                  />
                </TextInput.Root>
                
                {errors.state && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.state.message}</Text>
                )}
              </View>
            )}
          />
        </View>
      </View>

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
