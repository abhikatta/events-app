declare namespace NodeJS {
    interface ProcessEnv {
        AUTH_SECRET: string;
        AUTH_GOOGLE_ID: string;
        AUTH_GOOGLE_SECRET: string;
        NEXTAUTH_URL: string;
        DATABASE_URL: string;
        FIREBASE_API_KEY: string;
    }
}
