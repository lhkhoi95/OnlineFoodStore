"use client"
import { signIn } from "next-auth/react";

export const GoogleSignInButton = () => {
    const handleLoginWithGoogle = async () => {
        await signIn("google", {
            redirect: false,
            callbackUrl: "/order",
        });
    };

    return (
        <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="w-full inline-flex justify-center items-center px-4 py-1 bg-[#84593C] border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25 transition"
        >
            <svg className="w-6 h-6 mr-2 -ml-1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fbc02d" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 0-1.067-.033-2.116-.092-3.148z" />
                <path fill="#ea4335" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4285f4" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#34a853" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.067-.033-2.116-.092-3.148z" />
            </svg>

            Sign in with Google
        </button>
    );
}
