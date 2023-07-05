"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import LayoutProvider from "./layoutProvider";
import { Provider } from "react-redux";
import { store } from "../app/store/cartItem";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>Grocer</title>
        <body className={`${poppins.className} flex flex-col text-sm `}>
          <LayoutProvider>
            <main>{children}</main>
          </LayoutProvider>
        </body>
      </html>
    </Provider>
  );
}
