import Toast from "react-native-toast-message"

export const showSuccessToast: (message: string) => void = (message: string): void => {
  Toast.show({
    type: "success",
    text1: message,
  })
}

export const showErrorToast: (message: string) => void = (message: string): void => {
  Toast.show({
    type: "error",
    text1: message,
  })
}

export const showInfoToast: (message: string) => void = (message: string): void => {
  Toast.show({
    type: "info",
    text1: message,
  })
}
