import { Api } from "../api/address.api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"

interface AddressDetails {
  street: string
  district: string
  city: string
  state: string
}

interface AddressResponse {
  cep?: string
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean
}

const toAddressDetails = (data: AddressResponse | undefined): AddressDetails => ({
  street: data?.logradouro || "",
  district: data?.bairro || "",
  city: data?.localidade || "",
  state: data?.uf || "",
})

export const createAddressApi = (api: Api) => {
  return {
    findByCep: async (
      cep: string,
    ): Promise<
      { kind: "ok"; address: AddressDetails } | GeneralApiProblem | { kind: "not-found" }
    > => {
      const response: ApiResponse<AddressResponse> = await api.apisauce.get(`/ws/${cep}/json`)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      try {
        if (response.data?.erro) {
          return { kind: "not-found" }
        }

        return { kind: "ok", address: toAddressDetails(response.data) }
      } catch (e) {
        if (__DEV__ && e instanceof Error) {
          console.error(
            `Bad data: ${e.message}\n${JSON.stringify(response.data, null, 2)}`,
            e.stack,
          )
        }

        return { kind: "bad-data" }
      }
    },
  }
}
