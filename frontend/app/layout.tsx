import "./globals.css";
import Layout from "./components/Layout";
import NextAuthSessionProvider from "./providers/sessionProvider";

export default function RootLayout({ children }: ComponentProps) {
  return (
    <NextAuthSessionProvider>
      <Layout children={children} />
    </NextAuthSessionProvider>
  );
}
