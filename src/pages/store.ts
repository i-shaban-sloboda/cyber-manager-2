import { Store } from '../components/pages/Store/Store'
import { withLocale, withProtection } from '../utils/page'

export default Store

export const getServerSideProps = withProtection(
    withLocale(async (context) => {
        return { props: {} }
    }),
)
