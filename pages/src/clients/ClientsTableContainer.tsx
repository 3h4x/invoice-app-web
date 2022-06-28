import { useEffect } from 'react'

import { toast } from 'react-toastify'

import { fetchClients } from '../api/base'
import { useAsync } from '../utils/useAsync'

import { ClientsTable } from './ClientsTable'

export const ClientsTableContainer = () => {
  const { execute, status, value, error } = useAsync(fetchClients)

  useEffect(() => {
    if (error) {
      toast.error(`Got unexpected errror: ${error}`)
    }
  }, [error])

  useEffect(() => {
    execute(undefined)
  }, [execute])

  if (status === 'idle' || status === 'pending') {
    // TODO: spinner
    return <div>Loading</div>
  }
  if (status === 'error') {
    toast.error('Error while loading clients data.', { theme: 'colored' })
    return
  }
  if (!value) {
    toast.warn('No clients data.', { theme: 'colored' })
    return
  }

  return (
    <>
      <ClientsTable clients={[]} total={0} {...value.data} />
    </>
  )
}
