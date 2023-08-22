"use client";
import React, { useEffect } from "react";
import { Poppins } from "next/font/google";
import LayoutProvider from "../providers/layoutProvider";
import { useSession } from "next-auth/react";
import { useGrocerStore } from "../store/store";


const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({ children }: ComponentProps) {
  const { data: session, status } = useSession();
  const setUser = useGrocerStore((state) => state.setUser);
  const setCart = useGrocerStore((state) => state.setCart);

  useEffect(() => {
    if (status !== 'loading') {
      setCart();
    }
    if (status === "authenticated") {
      setUser(session.user);
    }
    if (status === "unauthenticated") {
      setUser(null);
    }
  }, [status, session, setUser, setCart]);

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <title>VinaTea</title>
      <body className={`${poppins.className} flex flex-col text-sm `}>
        <LayoutProvider>
          <main>{children}</main>
        </LayoutProvider>
      </body>
    </html>
  );
}
