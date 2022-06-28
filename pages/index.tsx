import { AuthGuard } from './src/auth/AuthGuard'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <AuthGuard>{/* <ClientsTableContainer /> */}</AuthGuard>
}

export default Home
