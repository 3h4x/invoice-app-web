import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import Head from 'next/head'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    fetch('http://localhost:3139/clients', {
      headers: {
        'x-access-token': '111',
        'Content-Type': 'application/json',
      },
    })
      .then((httpResponse) => {
        if (httpResponse.status !== 200) {
          return Promise.reject
        }
        console.log('fetched')
      })
      .then((jsonResponse) => {
        console.log(jsonResponse)
      })
      .catch((err) => {
        console.log('catch')
      })
  }, [])

  return (
    // <ErrorBoundary>
    <Box>
      <Head>
        <title>Invoice Application</title>
        <meta name='description' content='This is next generation invoice application' />
      </Head>
      {/* <Button variant='contained'
        onClick={() => { setToggle(!toggle) }}>Hello World</Button>
        {toggle ? (
            <ErrorBoundary scope='clients' errorComponent={(<div>Error</div>)>
            <ClientTableContentWithAsyncClass />
            </ErrorBoundary>
        ) : null
      } */}
    </Box>
    // </ErrorBoundry>
  )
}

export default Home
