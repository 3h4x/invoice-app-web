import { useEffect } from 'react'

import { toast } from 'react-toastify'

import { fetchClients } from '../api/base'
import { useAsync } from '../utils/useAsync'

import { ClientsTable, SortingProps } from './ClientsTable'

export type ClientsTableContainerProps = {
  page: number
  sort: string
  sortBy: string | null
} & SortingProps

export const ClientsTableContainer = (props: ClientsTableContainerProps) => {
  const { execute, status, value, error } = useAsync(fetchClients)
  const { page = 1, sort = 'ASC', sortBy = null, ...rest } = props

  useEffect(() => {
    execute({ page, sort, sortBy })
    console.log({ page, sort, sortBy })
  }, [execute, page, sort, sortBy])

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
      <ClientsTable
        onSortModelChange={(models) => {
          console.log(models)
        }}
        sortModel={[]}
        {...value.data}
        {...rest}
      />
    </>
  )
}
