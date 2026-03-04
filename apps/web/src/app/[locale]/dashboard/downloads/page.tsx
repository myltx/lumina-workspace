import React from "react";
import { DownloadCloud, Monitor, Copy } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { Post } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function DownloadsPage() {
  const t = await getTranslations("Dashboard.Downloads");

  const releases: Post[] = await prisma.post.findMany({
    where: {
      category: "RELEASE",
      status: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {releases.length === 0 ? (
          <div className="xl:col-span-2 bg-[#FAFAFA] rounded-[2rem] p-12 text-center border border-gray-100 flex flex-col items-center justify-center">
            <Monitor className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              暂无软件发布
            </h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              管理员尚未在云端控制台下发任何可用的软件资源或运行辅助组件，请稍后再来看看。
            </p>
          </div>
        ) : (
          releases.map((release, index) => {
            // Give even index a blue theme and odd index a gray theme for aesthetic variation
            const isPrimary = index % 2 === 0;
            return (
              <div
                key={release.id}
                className={`rounded-[2rem] p-8 md:p-10 shadow-[var(--shadow-soft)] border flex flex-col justify-between ${isPrimary ? "bg-white border-blue-50" : "bg-[#FAFAFA] border-gray-100"}`}>
                <div>
                  <div
                    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border ${isPrimary ? "bg-blue-50 border-blue-100" : "bg-white border-gray-200"}`}>
                    <Monitor
                      className={`w-8 h-8 ${isPrimary ? "text-[#1E60F2]" : "text-slate-700"}`}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                      {release.title}
                    </h2>
                    {release.tags && (
                      <span className="shrink-0 text-xs font-extrabold text-[#1E60F2] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                        {release.tags.split(",")[0]}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mb-4 flex items-center">
                    发布于{" "}
                    {dayjs(release.publishedAt || release.createdAt).format(
                      "YYYY-MM-DD",
                    )}
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-lg min-h-[3rem]">
                    {release.excerpt ||
                      release.content.substring(0, 100) + "..."}
                  </p>
                </div>

                {release.downloadUrl ? (
                  <a
                    href={release.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-10 w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center ${
                      isPrimary
                        ? "bg-[#1E60F2] text-white shadow-[var(--shadow-float)] hover:-translate-y-1 hover:bg-[#1748b6]"
                        : "bg-white text-slate-700 border border-gray-200 shadow-sm hover:bg-gray-50"
                    }`}>
                    <DownloadCloud className="w-5 h-5 mr-2" />
                    下载资源包
                  </a>
                ) : (
                  <button
                    disabled
                    className="mt-10 mx-auto w-full max-w-md bg-gray-100 text-gray-400 py-4 rounded-xl font-bold cursor-not-allowed flex items-center justify-center">
                    暂未提供下载链接
                  </button>
                )}
              </div>
            );
          })
        )}
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
