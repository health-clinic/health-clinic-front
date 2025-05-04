import Toast from "react-native-toast-message"

export const showSuccessToast = (message: string) => {
  Toast.show({
    type: "success",
    text1: message,
    position: "bottom",
    bottomOffset: 100,
  })
}

export const showErrorToast = (message: string | undefined) => {
  Toast.show({
    type: "error",
    text1: message,
    position: "bottom",
    bottomOffset: 100,
  })
}

export const showInfoToast = (message: string) => {
  Toast.show({
    type: "info",
    text1: message,
    position: "bottom",
    bottomOffset: 100,
  })
}
