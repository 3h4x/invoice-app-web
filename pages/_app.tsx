import { blue } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
