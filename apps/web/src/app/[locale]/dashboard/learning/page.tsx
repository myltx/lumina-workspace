import React from "react";
import { PlayCircle, ExternalLink } from "lucide-react";

export default function LearningPage() {
  const videos = [
    {
      title: "AI 量化交易系统新手入门指南",
      duration: "12:45",
      category: "基础教程",
      date: "2026-02-15",
    },
    {
      title: "如何正确上传 MT5 裸 K 截图让 AI 识别",
      duration: "08:30",
      category: "图表分析",
      date: "2026-02-20",
    },
    {
      title: "Gemini 与 Claude 多模型联合风控演示",
      duration: "25:10",
      category: "进阶战法",
      date: "2026-03-01",
    },
    {
      title: "实盘展示：AI 交易系统 24 小时挂机收益回顾",
      duration: "45:00",
      category: "实盘直播",
      date: "2026-03-02",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            教学与实盘观摩
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            学习如何最大化利用我们的 AI 系统，并查看最新实盘录像。
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1 border border-gray-50 transition-all duration-300 group cursor-pointer flex flex-col">
            {/* 封面占位符 */}
            <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <PlayCircle
                className="w-16 h-16 text-white/80 group-hover:scale-110 group-hover:text-white transition-all duration-300 z-10"
                strokeWidth={1.5}
              />

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-md">
                {video.duration}
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-xs font-extrabold text-[#1E60F2] bg-blue-50 px-3 py-1.5 rounded-full">
                  {video.category}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {video.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-relaxed group-hover:text-[#1E60F2] transition-colors">
                {video.title}
              </h3>

              <div className="mt-auto pt-6 flex items-center text-sm font-bold text-slate-400 group-hover:text-[#1E60F2] transition-colors">
                立即播放 <ExternalLink className="w-4 h-4 ml-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
