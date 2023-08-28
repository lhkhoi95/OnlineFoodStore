"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname: string = usePathname();
  const sharedHeaderPages = ["/", "/about", "/cart", "/order"];
  const sharedFooterPages = ["/about", "/cart", "/order"];

  return (
    <>
      {sharedHeaderPages.includes(pathname) && <Header />}
      {children}
      {sharedFooterPages.includes(pathname) && <Footer />}
    </>
  );
};

export default LayoutProvider;
