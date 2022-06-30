import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAuthContext } from './AuthContex'

export const AuthGuard = (props: { children: ReactNode }) => {
  const router = useRouter()

  const { userAuthToken } = useAuthContext()

  useEffect(() => {
    if (!userAuthToken) {
      router.push({ pathname: '/login' })
    }
  }, [userAuthToken, router])

  if (!userAuthToken) {
    return null
  }

  return <>{props.children}</>
}
