import Constants from "expo-constants"

const { apiUrl } = Constants.expoConfig?.extra ?? {}

export default {
  ADDRESS_API_URL: "https://viacep.com.br",
  API_URL: apiUrl,
}
