import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAuthContext } from './AuthContex'

export const NonAuthGuard = (props: { children: ReactNode }) => {
  const { userAuthToken } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (userAuthToken) {
      router.push('/')
    }
  }, [userAuthToken, router])

  if (userAuthToken) {
    return null
  }

  return <>{props.children}</>
}
