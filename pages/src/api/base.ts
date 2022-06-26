import axios from 'axios'

export const invoiceAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  headers: {
    'x-access-token': '111',
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
  return (await invoiceAPI.get('/clients')) as ClientsAPIResponse
}
