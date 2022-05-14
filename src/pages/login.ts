import { GetServerSideProps } from 'next'
import { getCsrfToken, getProviders, getSession } from 'next-auth/react'

import { Login } from '../components/pages/Login/Login'
import { pagesPath } from '../utils/$path'

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    return session
        ? {
              redirect: {
                  destination: pagesPath.lobby.$url().pathname,
                  permanent: false,
              },
          }
        : {
              props: {
                  csrfToken: await getCsrfToken(context),
                  providers: await getProviders(),
              },
          }
}
