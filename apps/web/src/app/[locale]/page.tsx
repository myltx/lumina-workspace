import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import LandingNavbar from "@/components/layout/LandingNavbar";
import { prisma } from "@lumina/core";
import dayjs from "dayjs";
import {
  ArrowRight,
  Bell,
  DownloadCloud,
  Monitor,
  CheckCircle2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const t = await getTranslations("Index");

  const announcements = await prisma.post.findMany({
    where: {
      category: "ANNOUNCEMENT",
      status: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 3,
  });

  const latestRelease = await prisma.release.findFirst({
    where: {
      status: "PUBLISHED",
      isLatest: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col relative overflow-hidden">
      <LandingNavbar />
      {/* Hero 首屏核心主体 (应用超级字号与大留白) */}
      <main className="flex-1 flex items-center justify-center pt-28 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* 超级加粗标题 (优化移动端折行) */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] md:leading-[1.05] mb-6 md:mb-8">
            {t("hero.titlePart1")}{" "}
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#1E60F2] to-cyan-400 mt-2 sm:mt-0">
              {t("hero.titlePart2")}
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-2xl text-slate-500 max-w-3xl mx-auto font-medium mb-10 md:mb-12 leading-relaxed px-4 md:px-0">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-10 py-5 bg-[#1E60F2] text-white text-lg font-bold rounded-full shadow-[var(--shadow-float)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              {t("hero.startAnalysis")}
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 text-lg font-bold rounded-full shadow-[var(--shadow-soft)] hover:bg-gray-50 transition-all duration-300">
              {t("hero.howItWorks")}
            </a>
          </div>
        </div>
      </main>

      {/* 特性展示区 */}
      <section
        id="features"
        className="py-16 md:py-24 bg-white relative z-10 w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6">
              {t("features.title")}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto px-4 md:px-0">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: t("features.items.visual.title"),
                desc: t("features.items.visual.desc"),
                icon: "👁️",
              },
              {
                title: t("features.items.risk.title"),
                desc: t("features.items.risk.desc"),
                icon: "🛡️",
              },
              {
                title: t("features.items.auto.title"),
                desc: t("features.items.auto.desc"),
                icon: "⚡",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAFA] rounded-[2rem] p-8 md:p-10 hover:bg-white hover:shadow-[var(--shadow-float)] transition-all duration-500 border border-transparent hover:border-blue-50">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 全新动态资讯区：系统公告与投研快讯 (CMS驱动) */}
      {announcements.length > 0 && (
        <section className="py-16 md:py-24 bg-[#FAFAFA] relative z-10 w-full border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
                  最新系统公告与发布
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl font-medium">
                  时刻了解平台最新的量化策略迭代、维护信息与行业快讯。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {announcements.map(
                (post: {
                  id: string;
                  title: string;
                  excerpt: string | null;
                  content: string;
                  publishedAt: Date | null;
                  createdAt: Date;
                }) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-[var(--shadow-float)] transition-all duration-300 border border-gray-100 flex flex-col group">
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm mb-4">
                      <Bell className="w-4 h-4 text-[#1E60F2]" />
                      <span>
                        {dayjs(post.publishedAt || post.createdAt).format(
                          "YYYY-MM-DD",
                        )}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-[#1E60F2] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 font-medium mb-6 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 80) + "..."}
                    </p>
                    <div className="mt-auto flex items-center text-[#1E60F2] font-bold text-sm">
                      查看详情{" "}
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* 诱饵展示区：最新官方软件包发行 (Release驱动) */}
      {latestRelease && (
        <section className="py-16 md:py-24 bg-white relative z-10 w-full border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-12 md:mb-16 text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E60F2] mb-4 border border-blue-100">
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> 官方最新发布通道
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
                获取革命性的量化交易引擎
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                立刻下载包含全栈 AI 策略的官方直签版
                EA，无门槛接入多重行情识别器。
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group border border-slate-800">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1E60F2]/30 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:bg-[#1E60F2]/40 transition-colors duration-700"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-inner backdrop-blur-sm">
                      <Monitor className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        {latestRelease.title}
                      </h3>
                      <div className="flex items-center mt-2 space-x-3">
                        <span className="text-sm font-bold text-blue-200">
                          {latestRelease.version}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                        <span className="text-sm text-slate-400 font-medium">
                          {latestRelease.platform}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {latestRelease.changelog
                        .split("\n")
                        .slice(0, 5)
                        .join("\n") +
                        (latestRelease.changelog.split("\n").length > 5
                          ? "\n..."
                          : "")}
                    </ReactMarkdown>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/dashboard/downloads"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-900 bg-white rounded-xl shadow-[var(--shadow-float)] hover:-translate-y-1 hover:bg-slate-50 transition-all duration-300 group/btn">
                      <DownloadCloud className="w-5 h-5 mr-2 text-[#1E60F2]" />
                      登录获取安装包
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <p className="mt-4 text-xs font-medium text-slate-400">
                      * 需注册获取平台密钥方可激活使用
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex justify-end relative">
                  <div className="w-full max-w-md aspect-square bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full border border-white/5 flex items-center justify-center p-8">
                    <div className="w-full h-full bg-slate-800/50 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                      <div className="text-center relative z-10">
                        <div className="text-6xl mb-4">🚀</div>
                        <div className="text-xl font-bold text-white tracking-wider font-mono">
                          {latestRelease.version}
                        </div>
                        <div className="text-sm text-blue-300 mt-2 font-medium">
                          READY TO DEPLOY
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 数据壁垒区 */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative z-10 w-full overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-12 md:mb-16 text-center px-4">
            {t("stats.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-16 w-full max-w-5xl">
            {[
              { val: "3", label: t("stats.items.models") },
              { val: "24/7", label: t("stats.items.service") },
              { val: "0", label: t("stats.items.code") },
              { val: "99.9%", label: t("stats.items.stability") },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-white mb-2 md:mb-4">
                  {stat.val}
                </div>
                <div className="text-sm md:text-base text-slate-400 font-bold tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 md:py-12 border-t border-gray-100 z-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 mb-6 md:mb-0">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Lumina Workspace
            </span>
            <span className="text-slate-400 text-sm">
              {t("footer.copyright")}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-bold text-slate-500 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#1E60F2] transition-colors">
              {t("footer.telegram")}
            </a>
            <a href="#" className="hover:text-[#1E60F2] transition-colors">
              {t("footer.contact")}
            </a>
            <a href="#" className="hover:text-[#1E60F2] transition-colors">
              {t("footer.privacy")}
            </a>
          </div>
        </div>
      </footer>

      {/* 科技感背景光晕点缀 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-cyan-300/10 blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
}
