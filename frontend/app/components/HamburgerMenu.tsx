import { useState } from "react";
import Link from "next/link";
import { useVinaTeaStore } from "../store/store";
import handleLogout from "@/utils/user";

export const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);
    const user = useVinaTeaStore((state) => state.user);
    const clearStore = useVinaTeaStore((state) => state.clearStore);

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
        <>
            <button
                className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
                onClick={() => setOpen(!open)}
            >
                <svg
                    className="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>

            <div
                className={`h-screen ${open ? 'flex' : 'hidden'} flex-col p-6 bg-[#151f2d] text-white absolute top-0 right-0 w-[50%] md:w-[25%]`}
            >
                <button
                    className="absolute top-0 right-0 p-4"
                    onClick={() => setOpen(false)}
                >
                    <svg
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <hr className="mt-8"></hr>
                <ul className="flex flex-col mt-3 gap-3 text-sm">
                    {user && <li className="flex items-center justify-between"><Link href="/profile">View Profile</Link><span>{'>'}</span></li>}
                    <li >
                        <Link className="flex items-center justify-between" href="/profile">View Cart<span>{'>'}</span></Link>
                    </li>
                    <li>
                        <Link className="flex items-center justify-between" href="#">Services<span>{'>'}</span></Link>
                    </li>
                    <li><Link className="flex items-center justify-between" href="#">Contact<span>{'>'}</span></Link></li>
                    {user ? <li><button
                        onClick={() => logout(user.accessToken)}
                        className="flex items-center justify-between w-full text-left"
                    >
                        <div>
                            <p>Logout</p>
                            <p className="text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        <span>{'>'}</span>
                    </button></li> : <li><Link className="flex items-center justify-between" href="/login">Login/SignUp<span>{'>'}</span></Link></li>}
                </ul>

            </div>

        </>);
}
