"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Index");

  return (
    <>
      <nav className="w-full absolute top-0 left-0 z-50 px-6 py-4 md:px-8 md:py-6 lg:px-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <div className="w-4 h-4 text-white">📈</div>
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            Lumina Workspace
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            联系我们
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            {t("nav.login")}
          </Link>
          <Link
            href="/register"
            className="text-sm font-bold bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-[var(--shadow-soft)] hover:-translate-y-0.5">
            {t("nav.getStarted")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <LanguageSwitcher />
          <button
            className="p-2 text-slate-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col px-6 py-6 space-y-4 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <Link
          href="/contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-base font-bold text-slate-900 w-full text-center py-3.5 border border-gray-100 rounded-xl shadow-sm">
          联系我们
        </Link>
        <Link
          href="/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-base font-bold text-slate-900 w-full text-center py-3.5 border border-gray-100 rounded-xl shadow-sm">
          {t("nav.loginDashboard")}
        </Link>
        <Link
          href="/register"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-base font-bold bg-[#1E60F2] text-white w-full text-center py-3.5 rounded-xl shadow-md">
          {t("nav.freeStart")}
        </Link>
      </div>
    </>
  );
}
