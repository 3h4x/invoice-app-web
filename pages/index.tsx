import { AuthGuard } from './src/auth/AuthGuard'
import { ClientsTableContainer } from './src/clients/ClientsTableContainer'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <AuthGuard>
      <ClientsTableContainer />
    </AuthGuard>
  )
}

export default Home
