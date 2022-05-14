import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Registration } from '../components/pages/Registration/Registration'
import { pagesPath } from '../utils/$path'

export default Registration

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    return session
        ? {
              redirect: {
                  destination: pagesPath.lobby.$url().pathname,
                  permanent: false,
              },
          }
        : { props: {} }
}
