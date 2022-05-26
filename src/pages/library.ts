import { Library } from '../components/pages/Library/Library'
import { withLocale, withProtection } from '../utils/page'

export default Library

export const getServerSideProps = withProtection(
    withLocale(async (context) => {
        return { props: {} }
    }),
)
