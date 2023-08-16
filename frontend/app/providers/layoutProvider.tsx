"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname: string = usePathname();
  const sharedLayoutPages = ["/", "/about", "/cart"];

  return (
    <>
      {sharedLayoutPages.includes(pathname) && <Header />}
      {children}
      {sharedLayoutPages.includes(pathname) && <Footer />}
    </>
  );
};

export default LayoutProvider;
