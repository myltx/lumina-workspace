"use client";

import React, { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { LineChart, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { toast } from "sonner";
import clsx from "clsx";

import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const t = useTranslations("Register");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Reset error state
    setHasError(false);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setHasError(true);
      toast.error("两次输入的密码不一致");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setHasError(true);
      toast.error("密码太短: 请至少输入 8 位密码");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Call custom register API
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "注册失败");
      }

      // 2. Automatically log in after successful registration
      const signInResponse = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (signInResponse?.error) {
        throw new Error("登录失败，请尝试重新手动登录");
      }

      toast.success(`注册成功！欢迎 ${name} 加入 Lumina Workspace`);
      router.push("/dashboard");
      router.refresh();
    } catch (error: Error | unknown) {
      console.error(error);
      setHasError(true);
      const err = error as Error;
      toast.error(err?.message || "注册出错，请稍后重试");
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
                htmlFor="name"
                className="block text-sm font-bold text-slate-700">
                {t("nameLabel")}
              </label>
              <div className="mt-1.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={clsx(
                    "appearance-none block w-full px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl bg-gray-50/50 font-medium transition-all text-sm outline-none",
                    hasError
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 placeholder-red-300"
                      : "border-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50",
                  )}
                  placeholder={t("namePlaceholder")}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-slate-700">
                账号名 *
              </label>
              <div className="mt-1.5">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={clsx(
                    "appearance-none block w-full px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl bg-gray-50/50 font-medium transition-all text-sm outline-none",
                    hasError
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 placeholder-red-300"
                      : "border-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50",
                  )}
                  placeholder="请输入您的登录账号"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700">
                {t("emailLabel")} (选填)
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-slate-700">
                确认密码 (Confirm Password)
              </label>
              <div className="mt-1.5 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={clsx(
                    "appearance-none block w-full px-4 py-2.5 sm:py-3 pr-12 border rounded-xl sm:rounded-2xl bg-gray-50/50 font-medium transition-all text-sm outline-none",
                    hasError
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 placeholder-red-300"
                      : "border-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50",
                  )}
                  placeholder="请再次输入您的密码"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4">
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
              {t("hasAccount")}{" "}
              <Link
                href="/login"
                className="font-bold text-[#1E60F2] hover:text-[#1748b6] transition-colors ml-1">
                {t("login")}
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
