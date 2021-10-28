declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly GITHUB_API_USER: string
            readonly GITHUB_API_TOKEN: string
            readonly DATO_API_FULL_TOKEN: string
            readonly DATO_API_READ_TOKEN: string
            readonly SITE_URL: string
            readonly JWT_SECRET: string
        }
    }
}
  
export {}