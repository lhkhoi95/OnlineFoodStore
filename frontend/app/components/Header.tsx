import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Cart } from "./Cart";
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
    <header className="bg-gray-800 text-white text-xl p-2 pl-4 pr-8">
      <nav className="bg-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              loading="eager"
              width={70}
              height={70}
              className="rounded-xl"
              priority
            />
          </Link>

          <SearchBar />
          <div className="flex items-center space-x-4">
            <div
              title={user ? "View Profile" : "Login"}
              className="relative hover:bg-slate-600 rounded-2xl p-2"
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
                    Hi, {user.name}
                    {isHovered && (
                      <div className="absolute top-[35px] right-0 bg-gray-600 rounded-md shadow-md p-2 text-sm w-[120px]">
                        <Link
                          href="/profile"
                          className="block py-1 px-2 hover:bg-gray-500 w-full text-left"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => handleLogout(user.accessToken)}
                          className="block py-1 px-2 hover:bg-gray-500 w-full text-left"
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
            <Cart />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
