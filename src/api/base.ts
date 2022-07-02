import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const backendAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ClientsDataType {
  companyDetails: {
    name: string
    address: string
    regNumber: string
    vatNumber: string
  }
  email: string
  id: string
  invoicesCount: number
  name: string
  totalBilled: number
  user_id: string
}

type ClientsAPIResponse = {
  clients: Array<ClientsDataType>
  total: number
}

export type FetchClientParams = {
  page: number
  sort: string
  sortBy: string | null
}

export const fetchClients = async (params: FetchClientParams) => {
  const queryObject = params.sortBy
    ? {
        page: params.page,
        sort: {
          [params.sortBy]: params.sort.toString(),
        },
      }
    : { page: params.page }
  return await backendAPI.get<ClientsAPIResponse>(`/clients?params=${JSON.stringify(queryObject)}`)
}

type UserAPILoginResponse = {
  companyDetails: {
    name: string
    address: string
    regNumber: string
    vatNumber: string
  }
  email: string
  id: string
  invoicesCount: number
  name: string
  totalBilled: number
  user_id: string
  token: string
}

export const UserAPI = {
  _requestRef: NaN,
  _responseRef: NaN,

  setupAPIToken(token: string, handleTokenExpired: () => unknown) {
    backendAPI.interceptors.request.eject(this._requestRef)
    backendAPI.interceptors.request.use((req) => {
      if (!req.headers) {
        req.headers = {}
      }
      req.headers['x-access-token'] = token
      return req
    })

    backendAPI.interceptors.response.eject(this._responseRef)

    this._responseRef = backendAPI.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        if (err instanceof AxiosError && err.response?.data === 'Invalid Token') {
          toast.warn('Your session has expired. Please login again.')
          handleTokenExpired()
        }
      },
    )
  },

  login: async (params: { email: string; password: string }) => {
    const loginResponse = await backendAPI.post<UserAPILoginResponse>('/login', {
      email: params.email,
      password: params.password,
    })

    return loginResponse.data
  },
}
