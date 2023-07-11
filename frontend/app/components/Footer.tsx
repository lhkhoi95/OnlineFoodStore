import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code will only run on the client-side
      console.log("Client-side rendering");
    } else {
      // This code will run on the server-side
      console.log("Server-side rendering");
    }
  }, []);
  return (
    <footer className="bg-gray-800 text-white w-full p-5 bottom-0">
      <p className="text-center">© 2023 by Grocer</p>
    </footer>
  );
};

export default Footer;
