import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] w-full bg-[#FAFAFA] overflow-hidden">
      {/* 侧边导航 / 移动端顶部 Header 与抽屉 */}
      <Sidebar />

      {/* 右侧核心主体内容视窗 */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto px-6 py-8 lg:px-12 lg:py-12">
        <div className="w-full max-w-7xl mx-auto h-full space-y-6 lg:space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
