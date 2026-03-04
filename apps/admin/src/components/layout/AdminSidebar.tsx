"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Settings,
  LogOut,
  LayoutDashboard,
  LineChart,
  Inbox,
  FileText,
  DownloadCloud,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const navItems = [
    { name: "总览", href: "/", icon: LayoutDashboard },
    { name: "用户管理", href: "/users", icon: Users },
    { name: "线索管理", href: "/leads", icon: Inbox },
    { name: "内容发布", href: "/cms", icon: FileText },
    { name: "应用与分发", href: "/releases", icon: DownloadCloud },
    { name: "账单与订单", href: "/billing", icon: CreditCard },
    { name: "系统设置", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden lg:flex">
      {/* Logo 区 */}
      <div className="h-20 flex items-center px-6 border-b border-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <LineChart className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            Admin<span className="text-[#1E60F2]">Pro</span>
          </span>
        </div>
      </div>

      {/* 导航表 */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 relative group">
              <item.icon className="w-5 h-5 mr-3 transition-colors group-hover:text-[#1E60F2]" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* 底部退出/信息 */}
      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-[#1E60F2] font-bold border-2 border-white shadow-sm">
            SU
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">
              Super Admin
            </p>
            <p className="text-xs font-medium text-slate-500 truncate">
              admin@luminaworkspace.com
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4 mr-2" />
          安全退出
        </button>
      </div>
    </aside>
  );
}
