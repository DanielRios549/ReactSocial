declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly GITHUB_API_USER: string
            readonly GITHUB_API_TOKEN: string
            readonly BACKEND_API_URL: string
            readonly BACKEND_API_TOKEN: string
            readonly SITE_URL: string
            readonly JWT_SECRET: string
            readonly NEXT_PUBLIC_STATS_URL: string
        }
    }
}
  
export {}