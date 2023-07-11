import "./globals.css";
import Layout from "./components/Layout";

export default function RootLayout({ children }: RootProps) {
  return <Layout children={children} />;
}
