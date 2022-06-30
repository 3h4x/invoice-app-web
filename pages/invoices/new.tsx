import { InvoiceForm } from '../../src/invoices/InvoiceForm'

export default function InvoiceFormPage() {
  return (
    <InvoiceForm
      onInvoiceSubmitRequest={(data) => {
        console.log(data)
      }}
    />
  )
}
