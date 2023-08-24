import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { CartIcon } from "./CartIcon";
import { useVinaTeaStore } from "../store/store";
import { HamburgerMenu } from "./HamburgerMenu";
import handleLogout from "@/utils/user";

const Header = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const clearStore = useVinaTeaStore((state) => state.clearStore);
  const user = useVinaTeaStore((state) => state.user);

  async function logout(accessToken: string) {
    try {
      await handleLogout(accessToken);
      // Clear the store
      clearStore();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="bg-[#1F2937] text-white shadow-md shadow-black-300 text-xl p-2 w-full">
      <nav className="bg-[#1F2937] mx-3">
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
              className="relative hover:bg-zinc-400 rounded-2xl p-2 sm:hidden lg:block"
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
                  <div className="text-sm relative">
                    <div className="flex items-center justify-between">
                      <Image
                        src="/images/profile.png"
                        alt="dummy-profile"
                        loading="eager"
                        width={40}
                        height={40}
                        className="rounded-full mr-2"
                        priority
                      />
                      {user.name}
                    </div>

                    {isHovered && (
                      <div className="absolute top-[48px] right-0 bg-slate-500 rounded-md shadow-md p-2 text-sm w-[120px]">
                        <Link
                          href="/profile"
                          className="block py-1 px-2 hover:bg-zinc-400 w-full text-left rounded-md"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => logout(user.accessToken)}
                          className="block py-1 px-2 hover:bg-zinc-400 w-full text-left rounded-md"
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
            <div className="lg:hidden">
              <HamburgerMenu />
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
