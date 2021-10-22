declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string
            NODE_ENV: 'development' | 'production'
            GITHUB_CLIENT_ID: string
            GITHUB_CLIENT_SECRET: string
            DATO_FULL_TOKEN: string
            DATO_READ_TOKEN: string
        }
    }
}
  
export {}