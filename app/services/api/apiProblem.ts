import { ApiResponse } from "apisauce"

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true; data: { error: string } }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true; data: { error: string } }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; data: { error: string } }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; data: { error: string } }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; data: { error: string } }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; data: { error: string } }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; data: { error: string } }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true; data: { error: string } }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data"; data: { error: string } }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | null {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannot-connect", temporary: true, data: { error: response.data?.error } }
    case "NETWORK_ERROR":
      return { kind: "cannot-connect", temporary: true, data: { error: response.data?.error } }
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true, data: { error: response.data?.error } }
    case "SERVER_ERROR":
      return { kind: "server", data: { error: response.data?.error } }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true, data: { error: response.data?.error } }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized", data: { error: response.data?.error } }
        case 403:
          return { kind: "forbidden", data: { error: response.data?.error } }
        case 404:
          return { kind: "not-found", data: { error: response.data?.error } }
        default:
          return { kind: "rejected", data: { error: response.data?.error } }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}
