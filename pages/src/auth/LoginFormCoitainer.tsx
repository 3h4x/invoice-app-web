import * as React from 'react'

import { useAsync } from '../utils/useAsync'
import { useAuthContext } from './AuthContex'
import LoginForm from './LoginForm'


import { useEffect } from 'react'


export default function LoginFormCoitainer() {
  const { setUserToken } = useAuthContext()

const {execute, value: loginSuccessValue, error} = useAsync(LoginAPI.login)

  useEffect(() => {
    if (loginSuccessValue) {
      console.log(loginSuccessValue)
      setUserToken(loginSuccessValue.token)
    }
  })

  return (
      <LoginForm onLogin={(params) => {
        execute(params)
      }
    } />
}
