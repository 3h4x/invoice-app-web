import { Box, Container, CssBaseline } from '@mui/material'
import Head from 'next/head'

import { AuthGuard } from './src/auth/AuthGuard'
import { ClientsTableContainer } from './src/clients/ClientsTableContainer'
import { ErrorBoundary } from './src/common/ErrorBoundary'
import PrimarySearchAppBar from './src/layout/AppBar'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <AuthGuard>
      <ErrorBoundary>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Head>
            <title>Awesome Invoice App</title>
            <meta name='description' content='This is next generation invoice application' />
          </Head>
          <Box sx={{ flexGrow: 1 }}>
            <PrimarySearchAppBar />
            <main>
              <Container sx={{ py: 8 }} maxWidth='md'>
                <ClientsTableContainer />
              </Container>
            </main>
          </Box>
        </Box>
      </ErrorBoundary>
    </AuthGuard>
  )
}

export default Home
