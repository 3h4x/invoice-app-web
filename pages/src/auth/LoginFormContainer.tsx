import * as React from 'react'
import { useEffect } from 'react'

import { UserAPI } from '../api/base'
import { useAsync } from '../utils/useAsync'

import { useAuthContext } from './AuthContex'
import { LoginForm } from './LoginForm'

export default function LoginFormCoitainer() {
  const { execute, value: loginSuccessValue } = useAsync(UserAPI.login)
  const { setAuthToken } = useAuthContext()

  useEffect(() => {
    if (loginSuccessValue) {
      setAuthToken(loginSuccessValue.token)
    }
  }, [loginSuccessValue, setAuthToken])

  return <LoginForm onLoginRequest={execute} />
}
