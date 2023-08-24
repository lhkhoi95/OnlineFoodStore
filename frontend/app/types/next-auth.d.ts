import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            avatar?: string | null;
            address: string;
            accessToken: string;
            loginWithProvider: boolean;
        }
    }
}
