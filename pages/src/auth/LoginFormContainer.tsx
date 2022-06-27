import * as React from 'react'

import { UserAPI } from '../api/base'
import { useAsync } from '../utils/useAsync'

import { useAuthContext } from './AuthContex'
import { LoginForm } from './LoginForm'

export default function LoginFormCoitainer() {
  // const { login } = useAuthContext()
  const { execute, error, status } = useAsync(UserAPI.login)

  // useEffect(() => {
  //   if (loginSuccessValue) {
  //     setAuthToken(loginSuccessValue.token)
  //   }
  // }, [loginSuccessValue])

  return (
    <LoginForm
      onLoginRequest={(value) => {
        console.log(value)
        execute(value)
      }}
    />
  )

  return <LoginForm />
}
