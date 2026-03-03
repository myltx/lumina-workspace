import React from "react";
import { TrendingUp, Users, Activity, Target } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "活跃总用户",
      value: "12,485",
      trend: "+12.5%",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "今日入金量 (USD)",
      value: "$45,200",
      trend: "+8.2%",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "AI 信号胜率",
      value: "85.2%",
      trend: "+2.1%",
      icon: Target,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
    {
      label: "挂机云算力负载",
      value: "68%",
      trend: "-5.0%",
      icon: Activity,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          控制台大盘
        </h1>
        <p className="mt-2 text-slate-500 font-medium">
          全局数据、运营指标概览与系统健康监控。
        </p>
      </div>

      {/* 数据概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)] border border-gray-50 flex flex-col justify-between group hover:shadow-[var(--shadow-float)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span
                className={`text-sm font-bold ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-900">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 图表或列表区域占位 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-[var(--shadow-soft)] border border-gray-50 h-[400px] flex items-center justify-center">
          <p className="text-slate-400 font-bold">
            每日新增用户与交易量趋势走势 (待接入曲线表)
          </p>
        </div>
        <div className="bg-white rounded-[2rem] p-8 shadow-[var(--shadow-soft)] border border-gray-50 h-[400px] flex items-center justify-center">
          <p className="text-slate-400 font-bold">平台最近日志</p>
        </div>
      </div>
    </div>
  );
}
