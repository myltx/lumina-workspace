"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navs = [
    { name: "极细需求解剖 (WBS)", path: "/" },
    { name: "三层商业沙盘", path: "/competitor-features" },
    // { name: "研发阶梯报价", path: "/quotation" }, // 暂时隐藏报价，等客户确认功能后再放开
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white font-black text-xl tracking-tight mr-10">
              Lumina Workspace
            </span>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-2">
                {navs.map((nav) => {
                  const isActive = pathname === nav.path;
                  return (
                    <Link
                      key={nav.path}
                      href={nav.path}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}>
                      {nav.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a
              href="#"
              className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
              联系研发负责人
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
