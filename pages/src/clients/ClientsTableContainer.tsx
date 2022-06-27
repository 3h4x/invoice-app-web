import { useEffect } from 'react'

import { fetchClients } from '../api/base'
import { useAsync } from '../utils/useAsync'

import { ClientsTable } from './ClientsTable'

export const ClientsTableContainer = () => {
  const { execute, status, value, error } = useAsync(fetchClients)

  useEffect(() => {
    execute(undefined)
  }, [])

  if (status === 'idle' || status === 'pending') {
    return <div>Loading</div>
  }
  if (status === 'error') {
    return <div>Error</div>
  }
  if (!value) {
    return <div>No data</div>
  }

  return <ClientsTable {...value.data} />
}
