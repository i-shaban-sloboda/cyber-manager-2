import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { pagesPath } from '../utils/$path'

const Home: NextPage = () => {
    return null
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    return {
        redirect: {
            destination: session
                ? pagesPath.lobby.$url().pathname
                : pagesPath.login.$url().pathname,
            permanent: false,
        },
    }
}
