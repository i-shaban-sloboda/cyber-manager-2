import { Library } from '../components/pages/Library/Library'
import { protectedPage } from '../utils/page'

export default Library

export const getServerSideProps = protectedPage(async (context) => {
    return { props: {} }
})
