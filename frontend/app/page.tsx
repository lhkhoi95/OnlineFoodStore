"use client";
import React from "react";
import { ProductsPage } from "./components/ProductsPage";
import SideBar from "./components/SideBar";

export default function Home() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2-10 gap-3">
      <SideBar />
      <ProductsPage />
    </main>
  );
}
