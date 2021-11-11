import type { AppProps } from 'next/app'
import { ThemeProvider } from '../src/contexts/themeContext'
import { AuthProvider } from '../src/contexts/authContext'
import { PostProvider } from '../src/contexts/postContext'
import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <PostProvider>
                    <Component {...pageProps} />
                </PostProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
export default App
