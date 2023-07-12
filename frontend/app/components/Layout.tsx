"use client";
import React, { useEffect, useState } from "react";
import { store } from "../store/cartItem";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import LayoutProvider from "../layoutProvider";
import { AnyAction, Store } from "@reduxjs/toolkit";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({ children }: RootProps) {
  // Define variable to store redux store with default value to null
  const [reduxStore, setReduxStore] = useState<Store<any, AnyAction> | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReduxStore(store);
    }
  }, [reduxStore]);

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <title>Grocer</title>
      <body className={`${poppins.className} flex flex-col text-sm `}>
        {reduxStore && <Provider store={reduxStore}>
          <LayoutProvider>
            <main>{children}</main>
          </LayoutProvider>
        </Provider>}
      </body>
    </html>
  );
}
