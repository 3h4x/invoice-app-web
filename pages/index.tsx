import { useEffect, useState } from 'react'

import { Box, Container, CssBaseline } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from './src/auth/AuthContex'
import { ClientsTableContainer } from './src/clients/ClientsTableContainer'
import { ErrorBoundary } from './src/common/ErrorBoundary'
import PrimarySearchAppBar from './src/layout/AppBar'

import type { NextPage } from 'next'

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const Home: NextPage = () => {
  const router = useRouter()

  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const [toggle, setToggle] = useState(false)

  const { userAuthToken } = useAuthContext()

  useEffect(() => {
    if (!userAuthToken) {
      router.push('/login')
    }
  }, [userAuthToken])

  if (!userAuthToken) {
    return null
  }

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Box>
  )
}

export default Home
