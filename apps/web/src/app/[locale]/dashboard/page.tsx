import React from "react";

export default function DashboardPage() {
  return (
    <>
      {/* 极简超大标题层 */}
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          欢迎回来, aqin
        </h1>
        <p className="text-slate-500 mt-3 flex items-center font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          系统状态运行良好
        </p>
      </header>

      {/* 数据概览卡片区: 应用大留白和大圆角 */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "交易分析", value: "0" },
          { label: "API调用", value: "12" },
          { label: "剩余调用", value: "88" },
          { label: "注册天数", value: "02" },
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

      {/* EA 授权状态区 */}
      <div className="mt-8 md:mt-10 bg-white rounded-3xl md:rounded-[2rem] p-8 lg:p-12 shadow-[var(--shadow-soft)] border border-gray-50 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-6 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-xs md:text-sm font-bold text-[#1E60F2] tracking-wider uppercase mb-2">
            Notice
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            您还没有 EA 授权
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-2 font-medium max-w-xl">
            购买授权后即可使用所有顶级 AI 智能交易系统的高级功能。
          </p>
        </div>

        <button className="w-full md:w-auto bg-[#1E60F2] text-white px-8 py-4 rounded-full font-bold shadow-[var(--shadow-float)] hover:bg-[#1748b6] hover:scale-105 transition-all duration-300 active:scale-95">
          立即购买授权
        </button>
      </div>
    </>
  );
}
