import { useState } from 'react'

import { Box, Container, CssBaseline } from '@mui/material'
import Head from 'next/head'

import Login from './src/auth/LoginFormCoitainer'
import { ClientsTableContainer } from './src/clients/ClientsTableContainer'
import { ErrorBoundary } from './src/common/ErrorBoundary'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [toggle, setToggle] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Container component='main' maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'grid' }}>
        <ErrorBoundary>
          <Head>
            <title>Invoice Application</title>
            <meta name='description' content='This is next generation invoice application' />
          </Head>
          {isAuthenticated ? <ClientsTableContainer /> : <Login />}
          {/* <Button variant='contained'
        onClick={() => { setToggle(!toggle) }}>Hello World</Button>
        {toggle ? (
            <ErrorBoundary scope='clients' errorComponent={(<div>Error</div>)>
            <ClientTableContentWithAsyncClass />
            </ErrorBoundary>
        ) : null
      } */}
        </ErrorBoundary>
      </Box>
    </Container>
  )
}

export default Home
