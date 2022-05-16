import { Registration } from '../components/pages/Registration/Registration'
import { unprotectedPage } from '../utils/page'

export default Registration

export const getServerSideProps = unprotectedPage(async (context) => {
    return { props: {} }
})
