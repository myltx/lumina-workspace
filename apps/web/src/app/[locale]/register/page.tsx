import React from "react";
import Link from "next/link";
import { LineChart, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
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
          创建您的分析账户
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          三步开启全自动化量化交易体验
        </p>
      </div>

      <div className="mt-8 mx-4 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        <div className="bg-white py-8 px-6 sm:py-10 sm:px-12 shadow-[var(--shadow-soft)] rounded-[2rem] sm:rounded-[2.5rem] border border-gray-50/80">
          <form className="space-y-5" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-slate-700">
                您的称呼
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 font-medium transition-all sm:text-sm"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700">
                邮箱地址
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 font-medium transition-all sm:text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700">
                设置密码
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 font-medium transition-all sm:text-sm"
                  placeholder="至少 8 位包含字母与数字"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-[var(--shadow-float)] text-sm font-bold text-white bg-[#1E60F2] hover:bg-[#1748b6] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E60F2] transition-all duration-300 group">
                免费注册
                <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6 space-y-4">
            <p className="text-sm text-slate-500 font-medium">
              已有账号？{" "}
              <Link
                href="/login"
                className="font-bold text-[#1E60F2] hover:text-[#1748b6] transition-colors ml-1">
                立即登录
              </Link>
            </p>
            <div className="flex justify-center mt-2">
              <Link
                href="/"
                className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 mr-1.5 rotate-180" />{" "}
                返回官网首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
