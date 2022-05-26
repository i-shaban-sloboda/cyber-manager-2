import { getCsrfToken, getProviders } from 'next-auth/react'

import { Login } from '../components/pages/Login/Login'
import { withLocale, withoutProtection } from '../utils/page'

export default Login

export const getServerSideProps = withoutProtection(
    withLocale(async (context) => {
        return {
            props: {
                csrfToken: await getCsrfToken(context),
                providers: await getProviders(),
            },
        }
    }),
)
