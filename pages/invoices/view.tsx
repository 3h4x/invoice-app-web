import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'

const AUTH_COOKIE_NAME = 'auth-token'

export default function InvoiceViewPage(props: { foo: string }) {
  return (
    <div>
      <h1>Invoice View Page {props.foo} </h1>
    </div>
  )
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
  return {
    props: {
      foo: 'bar',
    },
  }
}
