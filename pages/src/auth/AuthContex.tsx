import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { getCookie, setCookies } from 'cookies-next'

import { UserAPI } from '../api/base'

type LoginParams = {
  email: string
  password: string
}

const AUTH_COOKIE_NAME = 'auth-token'

export const AuthContext = createContext<null | {
  userAuthToken: string | null
  setAuthToken: (token: string) => unknown
  logout: () => unknown
}>(null)

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [userAuthToken, setAuthToken] = useState<string | null>(null)

  const persistToken = (token: string) => {
    setAuthToken(token)
    setCookies(AUTH_COOKIE_NAME, token)
  }

  useEffect(() => {
    if (userAuthToken) {
      UserAPI.setupAPIToken(userAuthToken)
    }
  }, [userAuthToken])

  useEffect(() => {
    const cookieToken = getCookie(AUTH_COOKIE_NAME)?.toString()
    if (cookieToken) {
      setAuthToken(cookieToken)
      UserAPI.setupAPIToken(cookieToken)
    }
  }, [])

  if (!userAuthToken) {
    return <div>Not authenticated</div>
  }

  return (
    <AuthContext.Provider
      value={{
        userAuthToken,
        setAuthToken: persistToken,
        logout: () => {
          console.log('logout')
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }

  return context
}
