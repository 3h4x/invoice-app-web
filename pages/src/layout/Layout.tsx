import { Box, Container, CssBaseline } from '@mui/material'
import Head from 'next/head'

import Menu from './Menu'

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Head>
        <title>Awesome Invoice App</title>
        <meta
          name='description'
          content='This is next generati
on invoice application'
        />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Menu />
        <main>
          <Container sx={{ py: 8 }} maxWidth='md'>
            {children}
          </Container>
        </main>
      </Box>
    </Box>
  )
}
