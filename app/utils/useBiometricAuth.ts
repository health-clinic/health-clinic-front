import * as LocalAuthentication from "expo-local-authentication"

export const authenticateWithBiometrics = async (): Promise<boolean> => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync()
  const isEnrolled = await LocalAuthentication.isEnrolledAsync()

  if (!hasHardware || !isEnrolled) {
    return false
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Autenticar com biometria",
    fallbackLabel: "Digite sua senha",
    cancelLabel: "Cancelar",
  })

  return result.success
}
