import { Heroes } from '../components/pages/Heroes/Heroes'
import { protectedPage } from '../utils/page'

export default Heroes

export const getServerSideProps = protectedPage(async (context) => {
    return { props: {} }
})
