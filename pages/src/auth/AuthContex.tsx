import { createContext, ReactNode, useContext, useState } from 'react'

type LoginParams = {
  email: string
  password: string
}

export const AuthContext = createContext<null | {
  userToken: string | null
  setAuthToken: (token: string) => unknown
  logout: () => unknown
}>(null)

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [userAuthToken, setAuthToken] = useState<string | null>(null)
  return (
    <AuthContext.Provider
      value={{
        userToken: userAuthToken,
        setAuthToken,
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
