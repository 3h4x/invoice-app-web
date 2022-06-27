import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAuthContext } from './src/auth/AuthContex'
import { ClientsTableContainer } from './src/clients/ClientsTableContainer'

import type { NextPage } from 'next'

const Clients: NextPage = () => {
  const router = useRouter()

  const [toggle, setToggle] = useState(false)

  const { logout, userAuthToken } = useAuthContext()

  useEffect(() => {
    if (!userAuthToken) {
      router.push('/login')
    }
  }, [userAuthToken])

  return <ClientsTableContainer />
}

export default Clients
