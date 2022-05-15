import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { AppSettings } from '../components/pages/AppSettings/AppSettings'
import { pagesPath } from '../utils/$path'

export default AppSettings

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    return session
        ? { props: {} }
        : {
              redirect: {
                  destination: pagesPath.login.$url().pathname,
                  permanent: false,
              },
          }
}
