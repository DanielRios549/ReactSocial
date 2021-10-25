declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly GITHUB_CLIENT_ID: string
            readonly GITHUB_CLIENT_SECRET: string
            readonly DATO_FULL_TOKEN: string
            readonly DATO_READ_TOKEN: string
            readonly LOCAL_URL: string
            readonly VERCEL_URL: string
        }
    }
}
  
export {}