import { AppSettings } from '../components/pages/AppSettings/AppSettings'
import { protectedPage } from '../utils/page'

export default AppSettings

export const getServerSideProps = protectedPage(async (context) => {
    return { props: {} }
})
