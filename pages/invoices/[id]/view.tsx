import { useEffect } from 'react'

import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'

import { UserAPI } from '../../../src/api/base'
import { getInvoiceById, InvoiceByIdResponse } from '../../../src/api/invoice'

const AUTH_COOKIE_NAME = 'auth-token'

export default function InvoiceViewPage(props: { invoiceData: InvoiceByIdResponse['invoice']; print: boolean }) {
  useEffect(() => {
    if (props.print) {
      window.print()
    }
  }, [props.print])

  return <div>Invoice View Page {props}</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = getCookie(AUTH_COOKIE_NAME, { req: context.req, res: context.res })

  if (!userToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  let invalidToken = false

  const id = context.query.id ? (Array.isArray(context.query.id) ? context.query.id[0] : context.query.id) : null
  const print = context.query.print
    ? Array.isArray(context.query.print)
      ? context.query.print[0]
      : context.query.print
    : false

  if (!id) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const invoiceData = await getInvoiceById(id)
  console.log(invoiceData)

  UserAPI.setupAPIToken(userToken.toString(), () => {
    invalidToken = true
  })

  return {
    props: {
      invoiceData,
      id,
      print,
    },
  }
}
