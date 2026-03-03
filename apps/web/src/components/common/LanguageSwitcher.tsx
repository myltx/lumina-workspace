"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, usePathname, routing, localeNames } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Globe, Check } from "lucide-react";

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center w-10 h-10 text-slate-500 hover:text-slate-900 transition-colors bg-white/50 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm hover:shadow-md cursor-pointer data-[state=open]:bg-white data-[state=open]:shadow-md"
        data-state={isOpen ? "open" : "closed"}>
        <Globe className="w-5 h-5 text-slate-400" />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-[calc(100%+0.5rem)] w-36 bg-white rounded-2xl shadow-[var(--shadow-float)] border border-gray-100 py-2 transition-all duration-200 origin-top-right z-50 ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}>
        <div className="flex flex-col">
          {routing.locales.map((loc) => {
            const isActive = loc === currentLocale;
            return (
              <Link
                key={loc}
                href={pathname}
                locale={loc}
                className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50
                  ${isActive ? "text-[#1E60F2] bg-blue-50/50" : "text-slate-600"}
                `}
                onClick={() => setIsOpen(false)}>
                <span>{localeNames[loc] || loc}</span>
                {isActive && <Check className="w-4 h-4 text-[#1E60F2]" />}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
