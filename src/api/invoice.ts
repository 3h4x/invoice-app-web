import { backendAPI } from './base'

export type InvoiceByIdResponse = {
  invoice: {
    user_id: string
    invoice_number: string
    client_id: string
    date: number
    dueDate: number
    value: number
    id: string
  }
  success: boolean
}

export const getInvoiceById = async (id: string) => {
  const result = await backendAPI.get<InvoiceByIdResponse>(`/invoices/${id}`)
  console.log(result)
  return result.data.invoice
}
