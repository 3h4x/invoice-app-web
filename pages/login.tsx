import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAuthContext } from './src/auth/AuthContex'
import LoginFormContainer from './src/auth/LoginFormContainer'

export default function Login() {
  const { userAuthToken } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (userAuthToken) {
      router.push('/')
    }
  }, [userAuthToken])

  if (userAuthToken) {
    return null
  }

  return <LoginFormContainer />
}
