import React, { FC, ReactElement, useRef } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Building2, ChevronLeft, Globe, House, Layers, MapPin, Route } from "lucide-react-native"
import { Button } from "@/components/Button"
import { TextInput } from "@/components/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import { showErrorToast } from "@/components/toast"
import { api } from "@/services/api/address.api"
import { createAddressApi } from "@/services/address/address.api"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"
import { CreateUnitData } from "@/services/unit/unit.api"

const schema = z.object({
  zipCode: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
})

type FormData = z.infer<typeof schema>

interface AddressFormProps {
  initialValues?: Partial<CreateUnitData>
  onNext: (values: Partial<CreateUnitData>) => void
  onBack: () => void
}

export const AddressForm: FC<AddressFormProps> = ({
  initialValues,
  onNext,
  onBack,
}: AddressFormProps): ReactElement => {
  const lastFetchedCep = useRef<string>("")

  const colors = tailwind.theme.extend.colors

  const { control, handleSubmit, setFocus, setValue } = useForm<FormData>({
    defaultValues: {
      zipCode: initialValues?.address?.zipCode ?? "",
      street: initialValues?.address?.street ?? "",
      number: initialValues?.address?.number ?? "",
      district: initialValues?.address?.district ?? "",
      city: initialValues?.address?.city ?? "",
      state: initialValues?.address?.state ?? "",
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const fetchAddress = async (zipCode: string): Promise<void> => {
    try {
      const cep = zipCode.replace(/\D/g, "")

      if (!cep || cep.length !== 8 || cep === lastFetchedCep.current) {
        return
      }

      lastFetchedCep.current = cep

      const response = await createAddressApi(api).findByCep(cep)
      if (response.kind !== "ok") {
        showErrorToast(
          "Não foi possível encontrar o endereço. Verifique se o CEP está correto e tente novamente.",
        )

        return
      }

      setValue("street", response.address.street)
      setValue("district", response.address.district)
      setValue("city", response.address.city)
      setValue("state", response.address.state)
    } catch (error) {
      console.error(error)

      showErrorToast("Ops! Tivemos um problema ao buscar o endereço. Tente novamente em instantes.")
    }
  }

  const hasError = (field: keyof FormData) => !!errors[field]

  const handleFormSubmit = (data: FormData) => {
    onNext({ address: data })
  }

  return (
    <View className="flex-1">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-2">
        <TouchableOpacity onPress={onBack} className="h-9 w-9 items-center justify-center">
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold">Nova unidade</Text>
      </View>

      <View className="flex-1 gap-4 p-4">
        <View className="flex-row items-center justify-center">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center">
              <Text className="text-white font-medium">1</Text>
            </View>

            <View className="w-12 h-0.5 bg-primary-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center">
              <Text className="text-white font-medium">2</Text>
            </View>

            <View className="w-12 h-0.5 bg-gray-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
              <Text className="text-white font-medium">3</Text>
            </View>

            <View className="w-12 h-0.5 bg-gray-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
              <Text className="text-white font-medium">4</Text>
            </View>

            <View className="w-12 h-0.5 bg-gray-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
              <Text className="text-white font-medium">5</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-3 mt-4">
          <MapPin size={24} color={colors.primary[600]} />

          <Text className="text-neutral-800 text-lg font-bold">Endereço da unidade</Text>
        </View>

        <Text className="text-neutral-600 text-sm">
          Informe o endereço completo onde a unidade de saúde estará localizada.
        </Text>

        <View className="flex-1 gap-4">
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
                      fetchAddress(value ?? "")
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
        </View>
      </View>

      <View className="flex-row gap-2 p-4">
        <Button onPress={onBack} className="flex-1 bg-transparent border border-primary-600">
          <Text className="text-base font-bold text-primary-600">Voltar</Text>
        </Button>

        <Button onPress={handleSubmit(handleFormSubmit, onError)} className="flex-1">
          <Text className="text-base font-bold text-neutral-900">Próximo</Text>
        </Button>
      </View>
    </View>
  )
}
