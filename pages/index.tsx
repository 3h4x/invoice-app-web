import { AuthGuard } from './src/auth/AuthGuard'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <AuthGuard>
      {/* <ErrorBoundary scope='clients' errrorComponent={<div>Error</div>}> */}
      {/* <ClientsTableContainer /> */}
      {/* </ErrorBoundary> */}
    </AuthGuard>
  )
}

export default Home
