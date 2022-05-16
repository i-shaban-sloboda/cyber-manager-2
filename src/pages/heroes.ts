import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Heroes } from '../components/pages/Heroes/Heroes'
import { pagesPath } from '../utils/$path'

export default Heroes

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
