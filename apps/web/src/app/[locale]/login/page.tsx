"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { LineChart, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { toast } from "sonner";
import clsx from "clsx";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const t = useTranslations("Login");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Reset error state
    setHasError(false);
    setIsLoading(true);

    if (password.length < 6) {
      setHasError(true);
      toast.error("密码格式不正确");
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setHasError(true);
        toast.error("账号或密码错误");
        return;
      }

      toast.success("登录成功，即将进入控制台！");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      setHasError(true);
      toast.error("服务器响应异常，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center pt-16 pb-6 sm:py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 语言切换按钮 */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-20">
        <LanguageSwitcher />
      </div>

      {/* 背景光晕装饰 */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 w-full px-4 sm:px-0">
        <Link
          href="/"
          className="flex items-center justify-center space-x-3 mb-4 sm:mb-8 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <LineChart className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-[#1E60F2] tracking-tight">
            Lumina Workspace
          </span>
        </Link>
        <h2 className="mt-2 sm:mt-4 text-center text-[1.5rem] sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t("title")}
        </h2>
        <p className="hidden sm:block mt-2 text-center text-sm text-slate-500 font-medium">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-4 sm:mt-6 mx-auto w-full sm:max-w-[480px] relative z-10 px-4 sm:px-0">
        <div
          className={clsx(
            "bg-white py-5 px-5 sm:py-8 sm:px-10 shadow-[var(--shadow-soft)] rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-50/80 transition-all duration-300",
            hasError && "animate-shake border-red-100 ring-4 ring-red-500/10",
          )}>
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-slate-700">
                {t("emailLabel")} 或账号名
              </label>
              <div className="mt-1.5">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={clsx(
                    "appearance-none block w-full px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl bg-gray-50/50 font-medium transition-all text-sm outline-none",
                    hasError
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 placeholder-red-300"
                      : "border-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50",
                  )}
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
              <div className="mt-1.5 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={clsx(
                    "appearance-none block w-full px-4 py-2.5 sm:py-3 pr-12 border rounded-xl sm:rounded-2xl bg-gray-50/50 font-medium transition-all text-sm outline-none",
                    hasError
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 placeholder-red-300"
                      : "border-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50",
                  )}
                  placeholder={t("passwordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
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

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  "w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-[1.25rem] shadow-[var(--shadow-float)] text-sm font-bold text-white transition-all duration-300 group",
                  isLoading
                    ? "bg-[#1E60F2]/70 cursor-not-allowed"
                    : "bg-[#1E60F2] hover:bg-[#1748b6] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E60F2]",
                )}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {t("submitButton")}
                    <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
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
                className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />{" "}
                {t("backToHome")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
