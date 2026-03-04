"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    setHasError(false);
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setHasError(true);
        toast.error(res.error || "账号或密码错误，或无权限");
        return;
      }

      toast.success("验证成功，欢迎进入管理控制台");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setHasError(true);
      toast.error("验证服务响应异常");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 背景光晕装饰 */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          AdminPro 控制台
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          请进行高权限身份校验
        </p>
      </div>

      <div className="mt-8 mx-4 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        <div
          className={clsx(
            "bg-white py-10 px-8 sm:px-12 shadow-[var(--shadow-soft)] rounded-[2.5rem] border border-gray-50/80 transition-all duration-300",
            hasError && "animate-shake border-red-100 ring-4 ring-red-500/10",
          )}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-slate-700">
                管理员账号 (账号或邮箱)
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={clsx(
                    "appearance-none block w-full px-4 py-3.5 border rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-sm outline-none",
                    hasError
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 placeholder-red-300"
                      : "border-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900/50",
                  )}
                  placeholder="请输入您的账号名或登录邮箱"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700">
                安全密码
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={clsx(
                    "appearance-none block w-full px-4 py-3.5 border rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-sm outline-none",
                    hasError
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 placeholder-red-300"
                      : "border-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900/50",
                  )}
                  placeholder="请输入您的安全密码"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  "w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-[1.25rem] shadow-lg shadow-slate-900/10 text-sm font-bold text-white transition-all duration-300 group",
                  isLoading
                    ? "bg-slate-800/70 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-black hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900",
                )}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    校验身份并登入
                    <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              此系统仅限内部员工及授权管理员访问。
              <br />
              IP 地址级操作记录已被加密归档。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
