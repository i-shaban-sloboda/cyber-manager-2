import type { NextPage } from 'next'

import { pagesPath } from '../utils/$path'
import { protectedPage } from '../utils/page'

const Home: NextPage = () => {
    return null
}

export default Home

export const getServerSideProps = protectedPage(async (context) => {
    return {
        redirect: {
            destination: pagesPath.lobby.$url().pathname,
            permanent: false,
        },
        props: {},
    }
})
