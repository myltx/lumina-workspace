import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DashboardPage() {
  const t = useTranslations("Dashboard.Overview");

  return (
    <>
      {/* 极简超大标题层 */}
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t("welcome", { name: "aqin" })}
        </h1>
        <p className="text-slate-500 mt-3 flex items-center font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          {t("systemStatus")}
        </p>
      </header>

      {/* 数据概览卡片区: 应用大留白和大圆角 */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: t("stats.analysis"), value: "0" },
          { label: t("stats.apiCalls"), value: "12" },
          { label: t("stats.apiRemaining"), value: "88" },
          { label: t("stats.daysRegistered"), value: "02" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center space-y-3 md:space-y-4 border border-gray-50/50 shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
              {/* 这个位置后续可放入根据名称匹配的 Icon */}
              <div className="w-5 h-5 bg-[#1E60F2]/80 rounded-sm"></div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-400">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 核心防盗防线：MT5 授权与机器码状态 */}
      <div className="mt-8 md:mt-10 bg-white rounded-3xl md:rounded-[2rem] p-8 lg:p-12 shadow-[var(--shadow-soft)] border border-gray-50 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-6 md:space-y-0 relative overflow-hidden">
        {/* 背景装饰光效 */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-600 rounded-full opacity-[0.03] blur-3xl pointer-events-none"></div>

        <div className="flex flex-col items-center md:items-start relative z-10 w-full md:w-2/3">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black tracking-widest uppercase rounded-full border border-green-200">
              Active License
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            MT5 终端授权保密库
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl mb-6">
            您的物理机器码保证了高净值内核策略的安全下推。切勿向他人泄露序列号与下载直链，否则底座防火墙将触发极速熔断并永久拉黑。
          </p>

          {/* 状态展示牌 */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 w-full bg-slate-50/80 rounded-2xl p-6 border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                绑定的终端编号 (MT5 Serial)
              </p>
              <p className="text-lg font-mono font-bold text-slate-800 tracking-tight">
                VIP-***-8892
              </p>
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                授权阻断日期 (Expire Date)
              </p>
              <p className="text-lg font-bold text-slate-800 flex items-center">
                2026-10-01{" "}
                <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded ml-2 font-black border border-red-100">
                  仅剩 210 天
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col space-y-3 w-full md:w-auto mt-6 md:mt-0">
          <Link
            href="/downloads"
            className="w-full text-center md:w-auto bg-[#1E60F2] text-white px-8 py-3.5 rounded-full font-bold shadow-[var(--shadow-float)] hover:bg-[#1748b6] hover:-translate-y-1 transition-all duration-300">
            前往源站下载库
          </Link>
          <button className="w-full text-center md:w-auto bg-white text-slate-500 border border-slate-200 px-8 py-3.5 rounded-full font-bold hover:bg-slate-50 transition-all duration-300">
            续费包年订阅
          </button>
        </div>
      </div>
    </>
  );
}
