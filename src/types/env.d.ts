declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly GITHUB_CLIENT_ID: string
            readonly GITHUB_CLIENT_SECRET: string
            readonly DATO_FULL_TOKEN: string
            readonly DATO_READ_TOKEN: string
            readonly SITE_URL: string
            readonly JWT_SECRET: string
        }
    }
}
  
export {}