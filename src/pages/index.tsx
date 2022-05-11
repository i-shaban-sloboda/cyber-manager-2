import type { NextPage, NextPageContext } from 'next'

import { pagesPath } from '../lib/$path'

const Home: NextPage = () => {
    return null
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
    return {
        redirect: {
            destination: pagesPath.login.$url().pathname,
            permanent: false,
        },
    }
}
