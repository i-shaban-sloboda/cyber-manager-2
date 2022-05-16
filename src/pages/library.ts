import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Library } from '../components/pages/Library/Library'
import { pagesPath } from '../utils/$path'

export default Library

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
