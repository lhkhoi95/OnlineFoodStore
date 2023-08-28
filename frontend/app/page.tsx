import React from "react";
import Image from "next/image"
import { OrderButton } from "./components/OrderButton";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-items-center mx-2 md:mx-[10%] lg:mx-[15%]">
        <Image src="/images/menu.png"
          alt="banner"
          width={600}
          height={600}
          className="rounded-lg my-10 mx-auto"
        />
        <h1 className="text-lg font-semibold font-sans tracking-wide mb-6 text-center text-[#846C4A]">
          We make fresh, delicious drinks with the best ingredients!
        </h1>
        <OrderButton />
      </div>
    </main>
  );
}
