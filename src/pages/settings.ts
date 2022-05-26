import { AppSettings } from '../components/pages/AppSettings/AppSettings'
import { withLocale, withProtection } from '../utils/page'

export default AppSettings

export const getServerSideProps = withProtection(
    withLocale(async (context) => {
        return { props: {} }
    }),
)
