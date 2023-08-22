import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { CartIcon } from "./CartIcon";
import { signOut } from "next-auth/react";
import SearchBar from "./SearchBar";
import { useGrocerStore } from "../store/store";
import { clearLocalCart } from "@/utils/cartStorage";
import logout from "@/lib/user";

const Header = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const user = useGrocerStore((state) => state.user);

  const handleLogout = async (accessToken: string) => {
    clearLocalCart();
    // Blacklist the accessToken in the backend
    await logout(accessToken);
    // Sign out from the frontend
    signOut();
  };

  return (
    <header className="bg-[#FCAE1E] text-[#333333] shadow-md shadow-amber-300 text-xl p-2 pl-4 pr-8 w-full">
      <nav className="bg-[#FCAE1E] mx-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="">
            <Image
              src="/images/logo.png"
              alt="logo"
              loading="eager"
              width={100}
              height={100}
              className="rounded-xl shadow-2xl hover:scale-110"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            <div
              className="relative hover:bg-amber-200 rounded-2xl p-2"
              title={user ? "View Profile" : "Login"}
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              <div className="hidden md:block">
                {user ? (
                  <div className="text-sm">
                    <div className="mr-2 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-[#8b5f42]">
                      <span className="font-bold text-[#84593C] dark:text-gray-300">{user.name[0]}</span>
                    </div>
                    {user.name}
                    {isHovered && (
                      <div className="absolute top-[55px] right-0 bg-amber-500 rounded-md shadow-md p-2 text-sm w-[120px]">
                        <Link
                          href="/profile"
                          className="block py-1 px-2 hover:bg-amber-200 w-full text-left"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => handleLogout(user.accessToken)}
                          className="block py-1 px-2 hover:bg-amber-200 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login">
                    <div className="flex items-center justify-center ">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm pt-1">Login/Sign Up</div>
                  </Link>
                )}
              </div>
            </div>
            <CartIcon />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
