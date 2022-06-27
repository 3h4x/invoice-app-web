import axios from 'axios'

export const backendAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

type ClientsAPIResponse = {
  data: {
    clients: Array<{
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
    }>
    total: number
  }
}

export const fetchClients = async () => {
  return await backendAPI.get<ClientsAPIResponse>('/clients')
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
  setupAPIToken: (token: string, handleTokenExpired: () => unknown) => {
    backendAPI.interceptors.request.use((req) => {
      if (!req.headers) {
        req.headers = {}
      }
      req.headers['x-access-token'] = token
      return req
    })

    backendAPI.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        if (err.response.status === 403 || err.response.status === 401) {
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
