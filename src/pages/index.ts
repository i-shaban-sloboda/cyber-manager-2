import type { NextPage } from 'next'

import { protectedPage } from '../utils/page'

const Home: NextPage = () => {
    return null
}

export default Home

export const getServerSideProps = protectedPage(async (context) => {
    return { props: {} }
})
