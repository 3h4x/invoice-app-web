import { AxiosError } from 'axios'
import produce from 'immer'
import create from 'zustand'

import { ClientsDataType, FetchClientParams, fetchClients } from '../api/base'

type ClientsStoreType = {
  clientsList: {
    clients: ClientsDataType[]
    total: number
    fetchStatus: 'idle' | 'pending' | 'error' | 'success'
    error: string | null
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  addClient: Function
  fetchClientsList: (params: FetchClientParams) => Promise<void>
}

export const useClientsStore = create<ClientsStoreType>((set) => ({
  clientsList: {
    clients: [],
    total: 0,
    fetchStatus: 'idle',
    error: null,
  },

  addClient: () => {},
  fetchClientsList: async (params: FetchClientParams) => {
    set(
      produce((state: ClientsStoreType) => {
        const { clientsList } = state
        clientsList.fetchStatus = 'pending'
        clientsList.clients = []
        clientsList.total = 0
        clientsList.error = null
      }),
    )

    try {
      const clientsResponse = await fetchClients(params)
      set(
        produce((state: ClientsStoreType) => {
          const { clientsList } = state
          clientsList.fetchStatus = 'success'
          clientsList.clients = clientsResponse.data.clients
          clientsList.total = clientsResponse.data.total
          clientsList.error = null
        }),
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data
        set(
          produce((state: ClientsStoreType) => {
            const { clientsList } = state
            clientsList.fetchStatus = 'error'
            clientsList.clients = []
            clientsList.total = 0
            clientsList.error = errorMessage
          }),
        )
      } else {
        set(
          produce((state: ClientsStoreType) => {
            const { clientsList } = state
            clientsList.fetchStatus = 'error'
            clientsList.clients = []
            clientsList.total = 0
            clientsList.error = 'Failed fetching clients'
          }),
        )
      }
    }
  },
}))
