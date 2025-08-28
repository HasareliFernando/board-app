import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen !bg-[#E6E8EC] flex flex-col">
      <Header />
      <div className="flex flex-1 mt-1">
        <SideNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
