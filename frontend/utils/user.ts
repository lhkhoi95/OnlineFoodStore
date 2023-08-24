import { logout } from "@/lib/user";
import { clearLocalCart } from "./cartStorage";
import { signOut } from "next-auth/react";

export default async function handleLogout(accessToken: string) {

    // Clear local cart
    clearLocalCart();
    // Blacklist the accessToken in the backend
    await logout(accessToken);

    // Sign out from the frontend
    signOut();
};