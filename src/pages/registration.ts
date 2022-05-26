import { Registration } from '../components/pages/Registration/Registration'
import { withLocale, withoutProtection } from '../utils/page'

export default Registration

export const getServerSideProps = withoutProtection(
    withLocale(async (context) => {
        return { props: {} }
    }),
)
