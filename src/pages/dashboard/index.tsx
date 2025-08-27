import HeaderBar from "@/components/HeaderBar";
import SideNav from '@/components/SideNav';
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen !bg-[#f5f5f5] flex flex-col">
      <HeaderBar />

      <div className="flex flex-1 mt-1">
        {/* Sidebar */}
        <SideNav />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
