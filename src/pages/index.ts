import type { NextPage } from 'next'

import { pagesPath } from '../utils/$path'
import { withProtection } from '../utils/page'

const Home: NextPage = () => {
    return null
}

export default Home

export const getServerSideProps = withProtection(async (context) => {
    return {
        redirect: {
            destination: pagesPath.lobby.$url().pathname,
            permanent: false,
        },
        props: {},
    }
})
