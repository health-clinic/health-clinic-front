import React, { FC, ReactElement } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Building2, ChevronLeft, Phone } from "lucide-react-native"
import { Button } from "@/components/Button"
import { TextInput } from "@/components/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldErrors, useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import { CreateUnitData } from "@/services/unit/unit.api"
// @ts-ignore
import tailwind from "./../../../../../tailwind.config"

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
})

type FormData = z.infer<typeof schema>

interface BasicInformationFormProps {
  initialValues?: Partial<CreateUnitData>
  onNext: (values: Partial<CreateUnitData>) => void
  onBack: () => void
}

export const BasicInformationForm: FC<BasicInformationFormProps> = ({
  initialValues,
  onNext,
  onBack,
}: BasicInformationFormProps): ReactElement => {
  const colors = tailwind.theme.extend.colors

  const { control, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: {
      name: initialValues?.name ?? "",
      phone: initialValues?.phone ?? "",
    },
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onError = (errors: FieldErrors<FormData>) => {
    setFocus(Object.keys(errors)[0] as keyof FormData)
  }

  const hasError = (field: keyof FormData) => !!errors[field]

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

            <View className="w-12 h-0.5 bg-gray-600" />
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
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

        <View className="flex-row items-center gap-2">
          <Building2 size={24} color={colors.primary[600]} />

          <Text className="text-neutral-800 text-lg font-bold">Informações básicas</Text>
        </View>

        <Text className="text-neutral-600 text-sm">
          Preencha as informações básicas da unidade de saúde que será cadastrada.
        </Text>

        <View className="flex-1 gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("name")}>
                  <TextInput.Icon icon={Building2} />

                  <TextInput.Control
                    ref={ref}
                    placeholder="Nome da unidade"
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    textContentType="name"
                    autoComplete="name"
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
            name="phone"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <View>
                <TextInput.Root hasError={hasError("phone")}>
                  <TextInput.Icon icon={Phone} />

                  <TextInput.MaskedControl
                    ref={ref}
                    placeholder="Telefone"
                    mask="(99) 99999-9999"
                    keyboardType="number-pad"
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    textContentType="telephoneNumber"
                    autoComplete="tel"
                  />
                </TextInput.Root>

                {errors.phone && (
                  <Text className="text-angry-500 text-xs mt-1">{errors.phone.message}</Text>
                )}
              </View>
            )}
          />
        </View>
      </View>

      <View className="p-4">
        <Button onPress={handleSubmit((data) => onNext(data), onError)}>
          <Text className="text-base font-bold text-neutral-900">Próximo</Text>
        </Button>
      </View>
    </View>
  )
}
