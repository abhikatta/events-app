declare namespace NodeJS {
    interface ProcessEnv {
        AUTH_SECRET: string;
        AUTH_GITHUB_ID: string;
        AUTH_GITHUB_SECRET: string;
        NEXTAUTH_URL: string;
        DATABASE_URL: string;
    }
}
