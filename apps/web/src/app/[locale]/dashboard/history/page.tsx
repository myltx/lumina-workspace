import React from "react";
import { Search, Filter, Plus, Inbox } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HistoryPage() {
  const t = useTranslations("Dashboard.History");
  // 模拟空状态数据 (可以改成有数据数组来查看列表效果)
  const historyData: Record<string, unknown>[] = [];

  return (
    <div className="space-y-8">
      {/* 头部区域 */}
      <header className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-2 font-medium">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="px-4 md:px-5 py-2 md:py-2.5 bg-blue-50 text-[#1E60F2] rounded-full text-xs md:text-sm font-bold border border-blue-100">
            {t("totalRecords", { count: historyData.length })}
          </div>
        </div>
      </header>

      {/* 数据概览迷你卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: t("stats.totalAnalysis"), value: "0" },
          { label: t("stats.todayAnalysis"), value: "0" },
          { label: t("stats.symbols"), value: "0" },
          { label: t("stats.latest"), value: t("stats.none") },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-[1.5rem] md:rounded-3xl p-5 md:p-6 flex flex-col items-center justify-center border border-gray-50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] focus-within:ring-2 focus-within:ring-[#1E60F2]/20 transition-all">
            <div className="text-xl md:text-2xl font-black text-slate-900 mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] md:text-xs font-medium text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* 搜索与操作栏 */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 gap-4 mt-4">
        <div className="flex-1 flex items-center space-x-3 w-full">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-300" />
            </div>
            <input
              type="text"
              className="w-full bg-white border border-gray-100 rounded-full pl-12 pr-4 py-3.5 focus:border-[#1E60F2]/30 focus:ring-4 focus:ring-[#1E60F2]/5 font-medium text-slate-900 placeholder:text-slate-300 outline-none transition-all shadow-sm"
              placeholder={t("searchPlaceholder")}
            />
          </div>

          <button className="bg-white border border-gray-100 p-3.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <button className="w-full md:w-auto flex items-center justify-center bg-[#1E60F2] text-white px-8 py-3.5 rounded-full font-bold shadow-[var(--shadow-float)] hover:-translate-y-0.5 hover:bg-[#1748b6] transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" />
          {t("newAnalysisBtn")}
        </button>
      </div>

      {/* 列表与空状态呈现区 */}
      <div className="bg-white rounded-3xl md:rounded-[2rem] p-6 md:p-8 min-h-[300px] md:min-h-[400px] flex items-center justify-center border border-gray-50 shadow-[var(--shadow-soft)] overflow-x-auto">
        {historyData.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6 max-w-md text-center">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center">
              <Inbox className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {t("empty.title")}
              </h3>
              <p className="text-slate-500 font-medium">{t("empty.desc")}</p>
            </div>
            <button className="text-[#1E60F2] font-bold hover:underline underline-offset-4 decoration-2">
              {t("empty.createLink")}
            </button>
          </div>
        ) : (
          <div className="w-full">{/* 未来列表的渲染处 */}</div>
        )}
      </div>
    </div>
  );
}
