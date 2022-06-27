import * as React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import LockIcon from '@mui/icons-material/Lock'
import { Container } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export type LoginFormValue = yup.InferType<typeof schema>

export type LoginFormProps = {
  onLoginRequest: (values: LoginFormValue) => unknown
}

export const LoginForm = (props: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>({
    resolver: yupResolver(schema),
  })

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit(props.onLoginRequest)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            {...register('email')}
            label='Email Address'
            autoComplete='email'
            autoFocus
            inputProps={{
              'data-test': 'email',
            }}
            error={!!errors.email}
            helperText={<span data-test='email-error'>{errors.email?.message ?? ' '}</span>}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            {...register('password')}
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputProps={{
              'data-test': 'password',
            }}
            error={!!errors.password}
            helperText={<span data-test='password-error'>{errors.password?.message ?? ' '}</span>}
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
