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
  }, [router.isReady, router.query.page, router.query.sort, router.query.sortBy])

  if (!queryParams.initialised) {
    // TODO: spinner
    return null
  }

  return (
    <AuthGuard>
      <ClientsTableContainer
        {...queryParams}
        sortModel={
          queryParams.sortBy
            ? [
                {
                  field: queryParams.sortBy,
                  sort: queryParams.sort.toLocaleLowerCase() as 'asc' | 'desc',
                },
              ]
            : []
        }
        onSortModelChange={(models) => {
          console.log(models)
          const { initialised, ...rest } = queryParams
          if (models.length === 0) {
            const { sortBy, ...ninjaSort } = queryParams
            router.push({ pathname: '/clients', query: { ...ninjaSort, sort: 'asc' } })
            return
          }
          router.push({ pathname: '/clients', query: { ...rest, sortBy: models[0].field, sort: models[0].sort } })
        }}
      />
    </AuthGuard>
  )
}

export default Clients
