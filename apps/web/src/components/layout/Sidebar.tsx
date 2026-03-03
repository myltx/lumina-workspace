"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import {
  LayoutDashboard,
  LineChart,
  History,
  BookOpen,
  DownloadCloud,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";

const navigationItems = [
  { name: "交易面板", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ai 图表分析", href: "/dashboard/ai-chart", icon: LineChart },
  { name: "交易记录", href: "/dashboard/history", icon: History },
  { name: "教学观摩", href: "/dashboard/learning", icon: BookOpen },
  { name: "系统下载", href: "/dashboard/downloads", icon: DownloadCloud },
];

const SidebarContent = ({ pathname }: { pathname: string }) => (
  <>
    {/* Logo 区域 (带返回首页链路) */}
    <Link
      href="/"
      className="flex items-center space-x-3 mb-10 lg:mb-16 pl-4 group active:scale-95 transition-transform cursor-pointer shrink-0">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
        <LineChart className="w-4 h-4 text-white" />
      </div>
      <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#1E60F2] transition-colors">
        TJZSQuant
      </span>
    </Link>

    {/* 导航菜单 */}
    <nav className="flex-1 space-y-2 overflow-y-auto">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "group flex items-center px-4 py-3.5 text-[15px] font-medium rounded-2xl transition-all duration-300 ease-in-out",
              isActive
                ? "bg-[#1E60F2]/[0.06] text-[#1E60F2] shadow-sm"
                : "text-slate-500 hover:bg-gray-50 hover:text-slate-900",
            )}>
            <Icon
              className={clsx(
                "mr-3.5 h-[1.15rem] w-[1.15rem] transition-colors duration-300",
                isActive
                  ? "text-[#1E60F2]"
                  : "text-slate-400 group-hover:text-slate-700",
              )}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>

    {/* 底部退出与用户信息栏 */}
    <div className="mt-auto flex flex-col pt-6 border-t border-gray-50 space-y-2 shrink-0">
      <Link
        href="/"
        className="flex items-center px-4 py-3 text-[15px] font-medium text-slate-500 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors group">
        <LogOut className="mr-3.5 h-[1.15rem] w-[1.15rem] text-slate-400 group-hover:text-red-500 transition-colors" />
        退出控制台
      </Link>

      <div className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-2xl transition-colors">
        <UserCircle className="w-10 h-10 text-slate-300 mr-3 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            测试账户
          </p>
          <p className="text-xs text-slate-400 truncate">API 剩余: 100次</p>
        </div>
      </div>
    </div>
  </>
);

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 移动端顶部 Header */}
      <header className="lg:hidden flex items-center justify-between bg-white border-b border-gray-100 px-6 py-4 shrink-0 shadow-sm z-30 relative">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <LineChart className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-extrabold text-slate-900 tracking-tight">
            TJZSQuant
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -mr-2 text-slate-500 hover:text-slate-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* PC 端常驻 Sidebar */}
      <aside className="hidden lg:flex w-72 h-full bg-white border-r border-gray-100 flex-col pt-10 pb-8 px-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.02)] z-10 shrink-0">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* 移动端抽屉 (Drawer) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}></div>

          {/* 侧边滑出面板 */}
          <aside className="relative flex-1 flex flex-col w-full max-w-[280px] h-full bg-white shadow-2xl pt-8 pb-6 px-6 animate-in slide-in-from-left duration-300 shadow-[var(--shadow-float)]">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 p-2 text-slate-400 hover:text-slate-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent pathname={pathname} />
          </aside>
        </div>
      )}
    </>
  );
}
