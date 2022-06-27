import { useAsync } from '../utils/useAsync'
import { fetchClients } from '../api/base'

import { ClientsTable } from './ClientsTable'

export const ClientsTableContainer = () => {
  const { status, value, error } = useAsync(fetchClients, true)
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
