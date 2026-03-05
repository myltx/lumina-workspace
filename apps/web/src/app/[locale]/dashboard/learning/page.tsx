import React from "react";
import { PlayCircle, ExternalLink, VideoOff } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { prisma } from "@lumina/core";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export default async function LearningPage() {
  const t = await getTranslations("Dashboard.Learning");

  const videos = await prisma.post.findMany({
    where: {
      category: "TUTORIAL",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 bg-[#FAFAFA] rounded-[2rem] p-12 text-center border border-gray-100 flex flex-col items-center justify-center">
            <VideoOff className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              暂无教学视频
            </h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              管理员尚未在云端控制台发布任何教学观摩视频或使用教程，请稍后再来看看。
            </p>
          </div>
        ) : (
          videos.map(
            (video: {
              id: string;
              title: string;
              videoUrl: string | null;
              tags: string | null;
              publishedAt: Date | null;
              createdAt: Date;
            }) => (
              <a
                href={video.videoUrl || "#"}
                target={video.videoUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                key={video.id}
                className="bg-white rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1 border border-gray-50 transition-all duration-300 group cursor-pointer flex flex-col block">
                {/* 封面占位符 */}
                <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <PlayCircle
                    className="w-16 h-16 text-white/80 group-hover:scale-110 group-hover:text-white transition-all duration-300 z-10"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-xs font-extrabold text-[#1E60F2] bg-blue-50 px-3 py-1.5 rounded-full">
                      {video.tags ? video.tags.split(",")[0] : "录像观摩"}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {dayjs(video.publishedAt || video.createdAt).format(
                        "YYYY-MM-DD",
                      )}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-relaxed group-hover:text-[#1E60F2] transition-colors">
                    {video.title}
                  </h3>

                  <div className="mt-auto pt-6 flex items-center text-sm font-bold text-slate-400 group-hover:text-[#1E60F2] transition-colors">
                    {t("playNow")} <ExternalLink className="w-4 h-4 ml-1.5" />
                  </div>
                </div>
              </a>
            ),
          )
        )}
      </div>
    </div>
  );
}
