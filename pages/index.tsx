import { useEffect, useState } from 'react'

import { Box, Button, Container, CssBaseline } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from './src/auth/AuthContex'
import { ClientsTableContainer } from './src/clients/ClientsTableContainer'
import { ErrorBoundary } from './src/common/ErrorBoundary'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()

  const [toggle, setToggle] = useState(false)

  const { logout, userAuthToken } = useAuthContext()

  useEffect(() => {
    if (!userAuthToken) {
      router.push('/login')
    }
  }, [userAuthToken])

  if (!userAuthToken){
    return null
  }

  return (
    <Container component='main' maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'grid' }}>
        <ErrorBoundary>
          <Head>
            <title>Invoice Application</title>
            <meta name='description' content='This is next generation invoice application' />
          </Head>
          <Button onClick={() => logout()}>Logout</Button>
          <ClientsTableContainer />
        </ErrorBoundary>
      </Box>
    </Container>
  )
}

export default Home
