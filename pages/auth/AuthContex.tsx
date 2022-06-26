import { createContext } from 'react'

type LoginParams = {
  email: string
  password: string
}

export const AuthContext = createContext<null | {
  userToken: string | null
  login: (params: LoginParams) => unknown
  logout: () => unknown
}>(null)

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        value = {
          userToken: null,
          login: (params: LoginParams) => {
            console.log(params)
          },
          logout: () => {
            console.log('logout')
          },
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}
