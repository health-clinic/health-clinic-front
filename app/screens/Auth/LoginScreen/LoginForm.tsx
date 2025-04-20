import { TextInput } from "@/components/TextInput"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native"
import { Button } from "@/components/Button"
import { Text, View } from "react-native"
import { useState } from "react"

interface LoginFormProps {
  isLoading: boolean
  onSubmit: (email: string, password: string) => void
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  return (
    <View className="flex-col gap-4">
      <TextInput.Root>
        <TextInput.Icon icon={Mail} />

        <TextInput.Control
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          autoComplete="email"
        />
      </TextInput.Root>

      <TextInput.Root>
        <TextInput.Icon icon={LockKeyhole} />

        <TextInput.Control
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isPasswordHidden}
          textContentType="password"
          autoComplete="password"
        />

        <TextInput.Action onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
          <TextInput.Icon icon={isPasswordHidden ? EyeOff : Eye} />
        </TextInput.Action>
      </TextInput.Root>

      <Button isLoading={isLoading} onPress={() => onSubmit(email, password)}>
        <Text className="text-base font-bold text-neutral-900">Entrar</Text>
      </Button>
    </View>
  )
}
