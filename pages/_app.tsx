import { blue, teal } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AuthContextProvider } from './src/auth/AuthContex'
import Layout from './src/layout/Layout'

import type { AppProps } from 'next/app'

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
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
