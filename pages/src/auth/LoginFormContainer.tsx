import * as React from 'react'
import { useEffect } from 'react'

import { toast } from 'react-toastify'

import { UserAPI } from '../api/base'
import { useAsync } from '../utils/useAsync'

import { useAuthContext } from './AuthContex'
import { LoginForm } from './LoginForm'

export default function LoginFormCoitainer() {
  const { execute, value: loginSuccessValue, error } = useAsync(UserAPI.login)

  const { setAuthToken } = useAuthContext()

  useEffect(() => {
    if (error && !loginSuccessValue) {
      if ('response' in error) {
        toast.error(`Login error: ${error?.response.data}`, { toastId: 'login-error' })
        toast.update('login-error', { autoClose: 3000 })
      }
    }
  }, [error, loginSuccessValue])

  useEffect(() => {
    if (loginSuccessValue) {
      toast.dismiss()
      setAuthToken(loginSuccessValue.token)
      toast.success('Logged in!')
    }
  }, [loginSuccessValue, setAuthToken])

  return <LoginForm onLoginRequest={execute} />
}
