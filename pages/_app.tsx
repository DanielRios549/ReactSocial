import type { AppProps } from 'next/app'
import { AuthProvider } from '../src/contexts/authContext'
import { PostProvider } from '../src/contexts/postContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <PostProvider>
                <Component {...pageProps} />
            </PostProvider>
        </AuthProvider>
    )
}
export default MyApp
