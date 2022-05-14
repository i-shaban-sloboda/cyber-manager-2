import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Lobby } from '../components/pages/Lobby/Lobby'
import { pagesPath } from '../utils/$path'

export default Lobby

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
