import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { getCookie, setCookies } from 'cookies-next'

import { UserAPI } from '../api/base'
import { useAsync } from '../utils/useAsync'

type LoginParams = {
  email: string
  password: string
}

const AUTH_COOKIE_NAME = 'auth-token'

export const AuthContext = createContext<null | {
  userAuthToken: string | null
  login: (params: LoginParams) => unknown
  setAuthToken: (token: string) => unknown
  logout: () => unknown
}>(null)

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [userAuthToken, setAuthToken] = useState<string | null>(null)
  const [isContextInitialized, setIsContextInitialized] = useState(false)

  const { execute } = useAsync(UserAPI.login)

  // const handleLogout = () => {
  //   setAuthToken(null)
  //   removeCookies(AUTH_COOKIE_NAME)
  // }

  const persistToken = (token: string) => {
    setAuthToken(token)
    setCookies(AUTH_COOKIE_NAME, token)
  }

  useEffect(() => {
    if (userAuthToken) {
      UserAPI.setupAPIToken(userAuthToken, () => {})
      setIsContextInitialized(true)
    }
  }, [userAuthToken])

  useEffect(() => {
    const cookieToken = getCookie(AUTH_COOKIE_NAME)?.toString()
    if (cookieToken) {
      setAuthToken(cookieToken)
      UserAPI.setupAPIToken(cookieToken, () => {})
    }
    setIsContextInitialized(true)
  }, [])

  if (!isContextInitialized) {
    // spinner
    console.log('loading')
  }

  return (
    <AuthContext.Provider
      value={{
        userAuthToken,
        login: (params: LoginParams) => {
          console.log(params)
          execute(params).then( (response ) => {
            console.log(response)
          })
        },
        setAuthToken: persistToken,
        // logout: handleLogout(),
        logout: () => {},
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
