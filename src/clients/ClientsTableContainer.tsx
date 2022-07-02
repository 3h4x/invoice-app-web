import { useEffect } from 'react'

import { toast } from 'react-toastify'

import { useClientsStore } from './ClientsStore'
import { ClientsTable, SortingProps } from './ClientsTable'

export type ClientsTableContainerProps = {
  page: number
  sort: string
  sortBy: string | null
} & SortingProps

export const ClientsTableContainer = (props: ClientsTableContainerProps) => {
  const { page = 1, sort = 'ASC', sortBy = null, ...rest } = props
  const { clients, total, fetchStatus, error } = useClientsStore((state) => state.clientsList)
  const fetchClientsList = useClientsStore((state) => state.fetchClientsList)

  console.log(clients)

  useEffect(() => {
    fetchClientsList({ page, sort, sortBy })
  }, [fetchClientsList, page, sort, sortBy])

  useEffect(() => {
    if (error) {
      toast.error(`Got unexpected errror: ${error}`)
    }
  }, [error])

  if (fetchStatus === 'idle' || fetchStatus === 'pending') {
    // TODO: spinner
    return <div>Loading</div>
  }
  if (fetchStatus === 'error') {
    toast.error('Error while loading clients data.', { theme: 'colored' })
    return
  }
  if (!clients || !total) {
    toast.warn('No clients data.', { theme: 'colored' })
    return
  }

  return (
    <>
      <ClientsTable clients={clients} total={total} sortModel={[]} {...rest} />
    </>
  )
}
