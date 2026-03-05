import React from "react";
import {
  DownloadCloud,
  Monitor,
  CheckCircle2,
  Copy,
  History,
  ArrowRight,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function DownloadsPage() {
  const t = await getTranslations("Dashboard.Downloads");

  const releases = await prisma.release.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  // 获取当前登录用户并判断授权状态
  const session = await auth();
  let isAuthorized = false;
  if (session?.user?.id) {
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { expireDate: true, mt5Serial: true },
    });
    // 如果有到期时间，且当前时间早于到期时间，则判定为已授权
    if (
      currentUser?.expireDate &&
      dayjs(currentUser.expireDate).isAfter(dayjs())
    ) {
      isAuthorized = true;
    }
  }

  const latestRelease = releases.find((r) => r.isLatest) || releases[0];
  const historyReleases = releases.filter((r) => r.id !== latestRelease?.id);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            获取最新核心基座
          </h1>
          <p className="text-slate-500 mt-3 font-medium text-lg">
            全系列官方安装包及发行说明 (Release
            Notes)，保持同步以获最佳收益指引。
          </p>
        </div>
      </header>

      {/* Hero: Latest Release */}
      {latestRelease ? (
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-8 w-1 bg-[#1E60F2] rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900">
              推荐稳定通道 (Stable)
            </h2>
          </div>
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[var(--shadow-soft)] border-2 border-blue-50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200/40 transition-colors duration-500"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#1E60F2] text-white shadow-sm shadow-blue-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    最新版
                  </span>
                  <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {latestRelease.platform}
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    发版时间:{" "}
                    {dayjs(
                      latestRelease.publishedAt || latestRelease.createdAt,
                    ).format("YYYY-MM-DD")}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {latestRelease.version}
                  </h3>
                  <p className="text-xl text-[#1E60F2] font-bold">
                    {latestRelease.title}
                  </p>
                </div>

                <div className="prose prose-slate prose-sm max-w-none text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100 max-h-[280px] overflow-y-auto custom-scrollbar">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {latestRelease.changelog}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-center items-center lg:items-end space-y-6 lg:border-l lg:border-slate-100 lg:pl-10">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shadow-inner">
                  <Monitor className="w-12 h-12 text-[#1E60F2]" />
                </div>

                <div className="w-full max-w-sm">
                  {latestRelease.downloadUrl ? (
                    isAuthorized ? (
                      <a
                        href={latestRelease.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center bg-[#1E60F2] text-white shadow-[var(--shadow-float)] hover:-translate-y-1 hover:bg-[#1748b6]">
                        <DownloadCloud className="w-5 h-5 mr-2" />立 即 下 载 安
                        装 包
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-red-50 border border-red-100 text-red-400 py-4 rounded-xl font-bold cursor-not-allowed flex items-center justify-center">
                        当前 MT5 未授权或已过期
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-100 text-gray-400 py-4 rounded-xl font-bold cursor-not-allowed flex items-center justify-center">
                      暂未挂载物理包链接
                    </button>
                  )}
                  <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                    下载代表您同意最终用户许可协议 (EULA)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-[#FAFAFA] rounded-[2rem] p-12 text-center border border-gray-100 flex flex-col items-center justify-center">
          <Monitor className="w-16 h-16 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">
            当前暂无任何安装包发布
          </h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            系统尚未同步任何版本数据，请稍后刷新或联系管理员。
          </p>
        </div>
      )}

      {/* Timeline: History Releases */}
      {historyReleases.length > 0 && (
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-8 w-1 bg-slate-300 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <History className="w-5 h-5 mr-2 text-slate-400" />
              历史归档时间轴
            </h2>
          </div>

          <div className="relative pl-4 md:pl-0">
            {/* 隐藏的时间轴贯穿线，仅在 PC 居中时完整显示可能比较复杂，这里采用左对齐贯穿线 */}
            <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-100 hidden md:block"></div>

            <div className="space-y-8">
              {historyReleases.map((release) => (
                <div
                  key={release.id}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-12 w-full">
                  {/* 时间标记列 */}
                  <div className="md:w-48 shrink-0 flex md:flex-col items-center md:items-end md:text-right pt-6 relative z-10">
                    <div className="absolute right-[-2.5rem] w-4 h-4 rounded-full border-4 border-white bg-slate-300 hidden md:block mt-1"></div>
                    <span className="text-sm font-bold text-slate-500 bg-slate-100/50 px-3 py-1 rounded-full md:bg-transparent md:px-0 md:py-0">
                      {dayjs(release.publishedAt || release.createdAt).format(
                        "YYYY-MM-DD",
                      )}
                    </span>
                  </div>

                  {/* 内容卡片列 */}
                  <div className="flex-1 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover:shadow-[var(--shadow-soft)] transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-slate-900">
                            {release.version}
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {release.platform}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-600 mb-4">
                          {release.title}
                        </h4>
                        <div className="prose prose-slate prose-sm max-w-none text-slate-500">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {release.changelog}
                          </ReactMarkdown>
                        </div>
                      </div>

                      <div className="shrink-0 mt-4 sm:mt-0">
                        {release.downloadUrl ? (
                          isAuthorized ? (
                            <a
                              href={release.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#1E60F2] hover:border-[#1E60F2]/30 transition-all">
                              获取归档包
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                          ) : (
                            <button
                              disabled
                              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm bg-red-50 border border-red-100 text-red-400 cursor-not-allowed">
                              授权已拦截
                            </button>
                          )
                        ) : (
                          <span className="inline-flex items-center px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-50 text-gray-400">
                            未挂载
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* API Token 配置区提示 */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-xl mt-12 relative overflow-hidden">
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
