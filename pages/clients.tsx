import { ClientsTableContainer } from './src/clients/ClientsTableContainer'

import type { NextPage } from 'next'
import { AuthGuard } from './src/auth/AuthGuard'

const Clients: NextPage = () => {
  return (
    <AuthGuard>
      <ClientsTableContainer />
    </AuthGuard>
  )
}

export default Clients
