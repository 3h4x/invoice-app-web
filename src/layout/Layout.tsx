import { ReactNode } from 'react'

import { Box, Container, CssBaseline } from '@mui/material'
import Head from 'next/head'
import { ToastContainer, Slide } from 'react-toastify'

import Menu from './Menu'

import 'react-toastify/dist/ReactToastify.css'

export default function Layout(props: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ToastContainer limit={3} transition={Slide} autoClose={3000} newestOnTop />

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
            {props.children}
          </Container>
        </main>
      </Box>
    </Box>
  )
}
