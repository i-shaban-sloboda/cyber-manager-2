import { ProfileSettings } from '../components/pages/ProfileSettings/ProfileSettings'
import { withLocale, withProtection } from '../utils/page'

export default ProfileSettings

export const getServerSideProps = withProtection(
    withLocale(async (context) => {
        return { props: {} }
    }),
)
