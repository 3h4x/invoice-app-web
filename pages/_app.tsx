import { useState, useEffect } from 'react'

import { blue, teal } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AuthContextProvider } from './src/auth/AuthContex'
import Layout from './src/layout/Layout'

import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: teal[600],
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated, setIsAuthenticated])

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider value={[isAuthenticated, setIsAuthenticated]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
