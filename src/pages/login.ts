import { getCsrfToken, getProviders } from 'next-auth/react'

import { Login } from '../components/pages/Login/Login'
import { unprotectedPage } from '../utils/page'

export default Login

export const getServerSideProps = unprotectedPage(async (context) => {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
            providers: await getProviders(),
        },
    }
})
