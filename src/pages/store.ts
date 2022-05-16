import { Store } from '../components/pages/Store/Store'
import { protectedPage } from '../utils/page'

export default Store

export const getServerSideProps = protectedPage(async (context) => {
    return { props: {} }
})
