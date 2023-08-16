import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

// function SidebarSkeleton() {
//   return (
//     <div className="p-6 m-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//       <Skeleton count={5} />
//     </div>
//   );
// }

export function ProductSkeleton() {
  return (
    <div className="h-[380px] w-[250px] p-6 m-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <Skeleton width={200} height={200} />
      <div className="text-gray-300 font-bold pt-1">
        <Skeleton width={150} />
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between pt-1 pb-1">
          <div className="font-bold text-2xl ">
            <Skeleton width={50} />
          </div>
          <div>
            <Skeleton width={100} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function loading() {
  return (
    <div className="pt-4">
      <p className="text-lg pl-3">All Products</p>
      <div className="flex flex-wrap pt-8">
        {Array.from({ length: 12 }).map((_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
