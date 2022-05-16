import { ProfileSettings } from '../components/pages/ProfileSettings/ProfileSettings'
import { protectedPage } from '../utils/page'

export default ProfileSettings

export const getServerSideProps = protectedPage(async (context) => {
    return { props: {} }
})
