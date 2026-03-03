import React from "react";
import { DownloadCloud, Monitor, FileCode2, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DownloadsPage() {
  const t = useTranslations("Dashboard.Downloads");

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">{t("subtitle")}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 核心 EA 下载 */}
        <div className="bg-white rounded-[2rem] p-10 shadow-[var(--shadow-soft)] border border-gray-50 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center mb-6 border border-blue-100">
              <Monitor className="w-8 h-8 text-[#1E60F2]" />
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("ea.title")}
              </h2>
              <span className="text-xs font-extrabold text-[#1E60F2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                v4.5.1
              </span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed mt-4">
              {t("ea.desc")}
            </p>
          </div>

          <button className="mt-10 w-full bg-[#1E60F2] text-white py-4 rounded-xl font-bold shadow-[var(--shadow-float)] hover:-translate-y-1 hover:bg-[#1748b6] transition-all flex items-center justify-center">
            <DownloadCloud className="w-5 h-5 mr-2" />
            {t("ea.downloadBtn")}
          </button>
        </div>

        {/* 脚本辅助工具 */}
        <div className="bg-[#FAFAFA] rounded-[2rem] p-10 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm">
              <FileCode2 className="w-8 h-8 text-slate-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {t("api.title")}
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed mt-4">
              {t("api.desc")}
            </p>
          </div>

          <button className="mt-10 w-full bg-white text-slate-700 border border-gray-200 py-4 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center">
            <DownloadCloud className="w-5 h-5 mr-2" />
            {t("api.downloadBtn")}
          </button>
        </div>
      </div>

      {/* API Token 配置区提示 */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-xl mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#1E60F2]/20 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="relative z-10 max-w-xl">
          <h3 className="text-2xl font-bold mb-3">{t("token.title")}</h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            {t("token.desc")}
          </p>
        </div>
        <div className="relative z-10 mt-6 md:mt-0 flex items-center shrink-0 w-full md:w-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-l-xl py-3.5 px-6 font-mono text-blue-300 text-sm flex-1 md:w-64 overflow-hidden text-ellipsis whitespace-nowrap">
            tk_8f92jA9vXn72KlM4_26Qc
          </div>
          <button className="bg-[#1E60F2] hover:bg-blue-500 text-white py-3.5 px-6 rounded-r-xl font-bold transition-colors flex items-center">
            <Copy className="w-4 h-4 mr-2" />
            {t("token.copyBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}
