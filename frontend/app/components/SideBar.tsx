import React from "react";
import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <>
      <div className="hidden lg:block bg-gray-800 text-white w-64 mx-auto mt-1 md:mt-[88px] mb-3 rounded-lg">
        {/* Sidebar content */}
        <ul className="p-4">
          <li className="py-2 px-4 hover:bg-gray-700">Dashboard</li>
          <li className="py-2 px-4 hover:bg-gray-700">Posts</li>
          <li className="py-2 px-4 hover:bg-gray-700">Users</li>
          {/* Add more sidebar items */}
        </ul>
      </div>
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-gray-800 text-white w-full mx-auto mt-1 rounded-t-lg z-10">
        {/* Sidebar content */}
        <ul className="flex justify-around items-center p-4">
          <li className="py-2 px-4 hover:bg-gray-700">
            <HomeIcon className="h-6 w-6" />
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <DocumentTextIcon className="h-6 w-6" />
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <UserIcon className="h-6 w-6" />
          </li>
          {/* Add more sidebar items */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
