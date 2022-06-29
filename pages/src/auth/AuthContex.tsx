import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { getCookie, removeCookies, setCookies } from 'cookies-next'

import { UserAPI } from '../api/base'

const AUTH_COOKIE_NAME = 'auth-token'

export const AuthContext = createContext<null | {
  userAuthToken: string | null
  setAuthToken: (token: string) => unknown
  logout: () => unknown
}>(null)

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [userAuthToken, setAuthToken] = useState<string | null>(null)
  const [isContextInitialized, setIsContextInitialized] = useState(false)

  const persistToken = (token: string) => {
    setAuthToken(token)
    setCookies(AUTH_COOKIE_NAME, token)
  }

  const handleLogout = () => {
    // TODO: add toaster
    setAuthToken(null)
    removeCookies(AUTH_COOKIE_NAME)
  }

  useEffect(() => {
    if (userAuthToken) {
      UserAPI.setupAPIToken(userAuthToken, handleLogout)
      setIsContextInitialized(true)
    }
  }, [userAuthToken])

  useEffect(() => {
    const cookieToken = getCookie(AUTH_COOKIE_NAME)?.toString()
    if (cookieToken) {
      setAuthToken(cookieToken)
    } else {
      setIsContextInitialized(true)
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      userAuthToken,
      setAuthToken: persistToken,
      logout: handleLogout,
    }),
    [userAuthToken],
  )

  if (!isContextInitialized) {
    return null
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }

  return context
}
