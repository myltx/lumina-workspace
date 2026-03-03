import React from "react";
import { Link } from "@/i18n/routing";
import { LineChart, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function LoginPage() {
  const t = useTranslations("Login");

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 语言切换按钮 */}
      <div className="absolute top-8 right-8 sm:right-12 z-20">
        <LanguageSwitcher />
      </div>

      {/* 背景光晕装饰 */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link
          href="/"
          className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <LineChart className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            TJZSQuant
          </span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-8 mx-4 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        <div className="bg-white py-8 px-6 sm:py-10 sm:px-12 shadow-[var(--shadow-soft)] rounded-[2rem] sm:rounded-[2.5rem] border border-gray-50/80">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700">
                {t("emailLabel")}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 font-medium transition-all sm:text-sm"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700">
                {t("passwordLabel")}
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 font-medium transition-all sm:text-sm"
                  placeholder={t("passwordPlaceholder")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#1E60F2] focus:ring-[#1E60F2] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-medium text-slate-600">
                  {t("rememberMe")}
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-bold text-[#1E60F2] hover:text-[#1748b6] transition-colors">
                  {t("forgotPassword")}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-[var(--shadow-float)] text-sm font-bold text-white bg-[#1E60F2] hover:bg-[#1748b6] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E60F2] transition-all duration-300 group">
                {t("submitButton")}
                <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6 space-y-4">
            <p className="text-sm text-slate-500 font-medium">
              {t("noAccount")}{" "}
              <Link
                href="/register"
                className="font-bold text-[#1E60F2] hover:text-[#1748b6] transition-colors ml-1">
                {t("register")}
              </Link>
            </p>
            <div className="flex justify-center mt-2">
              <Link
                href="/"
                className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 mr-1.5 rotate-180" />{" "}
                {t("backToHome")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
