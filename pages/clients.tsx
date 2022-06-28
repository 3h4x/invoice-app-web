import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AuthGuard } from './src/auth/AuthGuard'
import { ClientsTableContainer } from './src/clients/ClientsTableContainer'

import type { NextPage } from 'next'

const Clients: NextPage = () => {
  const router = useRouter()

  const [queryParams, setQueryParams] = useState({
    page: 1,
    sort: 'ASC',
    sortBy: null as null | string,
    initialised: false,
  })

  useEffect(() => {
    if (router.isReady && router.query) {
      console.log(router.query)
      const page = parseInt(
        router.query.page ? (Array.isArray(router.query.page) ? router.query.page[0] : router.query.page) : '1',
        10,
      )

      const sortBy = router.query.sortBy
        ? Array.isArray(router.query.sortBy)
          ? router.query.sortBy[0]
          : router.query.sortBy
        : null

      const sort = router.query.sort
        ? Array.isArray(router.query.sort)
          ? router.query.sort[0]
          : router.query.sort
        : 'ASC'
      setQueryParams({
        page,
        sort,
        sortBy,
        initialised: true,
      })
    }
  }, [router.isReady, router.query])

  console.log(queryParams)

  if (!queryParams.initialised) {
    // TODO: spinner
    return null
  }

  return (
    <AuthGuard>
      <ClientsTableContainer />
    </AuthGuard>
  )
}

export default Clients
