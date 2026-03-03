import React from "react";
import { Bell, Search, Menu } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center">
        <button className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        {/* 全局搜索框拟态 */}
        <div className="hidden md:flex items-center bg-gray-50/50 hover:bg-gray-100/80 border border-gray-100 rounded-full px-4 py-2.5 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1E60F2]/20 focus-within:border-[#1E60F2]/50 w-64 md:w-80 group">
          <Search className="w-4 h-4 text-slate-400 group-focus-within:text-[#1E60F2] transition-colors" />
          <input
            type="text"
            placeholder="搜索用户、订单..."
            className="bg-transparent border-none outline-none text-sm font-medium ml-2 w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-gray-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
