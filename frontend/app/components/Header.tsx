import Link from "next/link";
import Image from "next/image";
import logo from "@/app/components/images/logo.png";
import React from "react";
import Cart from "./Cart";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white text-xl p-2 pl-4 pr-8">
      <nav className="bg-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="logo"
              loading="eager"
              width={70}
              height={70}
              className="rounded-xl"
              placeholder="blur"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link className="hover:bg-slate-600 rounded-2xl p-2" href="/about">
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              title="Login"
              className="hover:bg-slate-600 rounded-2xl p-2"
            >
              <div className="flex items-center justify-center">
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
            <Cart />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
