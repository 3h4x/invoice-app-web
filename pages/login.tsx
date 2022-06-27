import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAuthContext } from './src/auth/AuthContex'
import LoginFormContainer from './src/auth/LoginFormContainer'

export default function Login() {
  const router = useRouter()
  const { userAuthToken } = useAuthContext()

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (userAuthToken) {
      router.push('/')
    }
  }, [userAuthToken])

  if (!userAuthToken) {
    console.log('loading')
  }

  return <LoginFormContainer />
}
