import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { ProfileSettings } from '../components/pages/ProfileSettings/ProfileSettings'
import { pagesPath } from '../utils/$path'

export default ProfileSettings

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
