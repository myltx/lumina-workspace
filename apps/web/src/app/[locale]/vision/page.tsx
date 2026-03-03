"use client";

import React from "react";
import {
  Globe,
  Server,
  Users,
  MessageSquare,
  Download,
  FileText,
  ShieldCheck,
  Database,
  ArrowRight,
  Activity,
  Smartphone,
  CheckCircle2,
  CircleDashed,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export default function VisionRoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 pb-24">
      {/* 顶部简易导航 (仅用于返回或Logo展示) */}
      <nav className="w-full px-6 py-4 md:px-8 md:py-6 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
            <LineChartIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#1E60F2] transition-colors">
            Lumina <span className="text-[#1E60F2]">Workspace</span>
          </span>
        </Link>
        <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          Project Vision & Roadmap
        </div>
      </nav>

      <div className="max-w-7xl mx-auto space-y-20 pt-16 px-6 lg:px-12">
        {/* Section 1: Header Title */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-2 shadow-inner">
            <Activity className="w-8 h-8 text-[#1E60F2]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            赋能下一代 <span className="text-[#1E60F2]">交易门户生态</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-slate-500 max-w-3xl mx-auto pt-2">
            我们正在构建一个高度自动化、强管控、带客联机制的服务型生态系统。
            这份白皮书详细揭示了我们的架构流向与演进路线图。
          </p>
        </div>

        {/* Section 2: 核心架构图 (原 Presentation 页内容) */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">
              系统全景业务逻辑
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              清晰拆解 C端获客流 与 B端管控运营流 的端到端闭环
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-stretch">
            {/* 左侧：C端 Web 客端 */}
            <div className="col-span-1 lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-[#1E60F2]"></div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-2xl">
                  <Globe className="w-8 h-8 text-[#1E60F2]" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    C端 - Web 旗舰主站
                  </h2>
                  <p className="font-medium text-slate-500 text-sm">
                    面向用户的交易门户与服务大厅
                  </p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl flex items-start space-x-4 hover:bg-blue-50/50 transition-colors">
                  <FileText className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900">
                      1. 动态官网大厅 (Landing)
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                      展示产品特性、软件亮点与基础定价，内容纯动态加载。
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl flex items-start space-x-4 hover:bg-blue-50/50 transition-colors">
                  <Download className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900">
                      2. 软件下发与日志中心
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                      用户可查看历史版本更新日志 (Changelog)
                      并下载对应的软件包。
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl flex items-start space-x-4 hover:bg-emerald-50/50 transition-colors">
                  <MessageSquare className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900">
                      3. 在线客服与意向表单
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                      随时贴身沟通，或者主动填写表单留下联系方式与线索。
                    </p>
                  </div>
                </div>
              </div>
              <Smartphone className="w-32 h-32 absolute -bottom-6 -right-6 text-blue-50 opacity-50 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            </div>

            {/* 中间连接总线 */}
            <div className="col-span-1 lg:col-span-3 flex flex-col items-center justify-center space-y-6 py-12 lg:py-0">
              <div className="w-full flex items-center justify-center relative">
                <div className="h-0.5 w-full bg-slate-200 absolute z-0 left-0 hidden lg:block"></div>
                <div className="bg-white px-6 py-4 rounded-full border-2 border-[#1E60F2] shadow-[0_0_20px_rgba(30,96,242,0.2)] z-10 flex flex-col items-center">
                  <Database className="w-6 h-6 text-[#1E60F2] mb-1" />
                  <span className="font-bold text-sm text-slate-700">
                    核心 API & Postgres
                  </span>
                </div>
              </div>

              {/* 数据流向指示词 */}
              <div className="flex flex-col space-y-3 w-full max-w-[200px]">
                <div className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-2 border border-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
                  后台发包/发文 <ArrowRight className="w-3 h-3 ml-2" />
                </div>
                <div className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-2 border border-amber-100 rounded-xl flex items-center justify-center shadow-sm">
                  <ArrowRight className="w-3 h-3 mr-2 rotate-180" />{" "}
                  前台留表单/发求助
                </div>
              </div>
            </div>

            {/* 右侧：B端 Admin 端 */}
            <div className="col-span-1 lg:col-span-4 bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center space-x-4 mb-8 relative z-10">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <Server className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">
                    B端 - Admin 管控端
                  </h2>
                  <p className="font-medium text-emerald-400/80 text-sm">
                    运营团队的中枢调度指挥中心
                  </p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="bg-white/5 p-4 border border-white/10 rounded-2xl flex items-start space-x-4 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <FileText className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white">
                      1. CMS 动态内容管控
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">
                      编辑官网文本、下发全局公告、动态修改宣传标语。
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 border border-white/10 rounded-2xl flex items-start space-x-4 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white">
                      2. 软件发版中心 (Releases)
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">
                      上传新版软件本体，修撰日志，一键推送至全球用户端。
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 border border-white/10 rounded-2xl flex items-start space-x-4 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <Users className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white">
                      3. 线索工单与权限池 (RBAC)
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">
                      接听C端客服求助，回收高意向客户表单；管控超管及编辑权限。
                    </p>
                  </div>
                </div>
              </div>
              <Users className="w-32 h-32 absolute -bottom-4 -left-6 text-white opacity-5 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>

        {/* Section 3: 开发进度与路线图 */}
        <div className="pt-12 border-t border-slate-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">
              工程进度与演进路线图 (Roadmap)
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              从 UI 骨架到 AI 深度计算链路的系统落地周期表
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Phase 1 (Completed) */}
            <div className="bg-white p-6 rounded-[2rem] border-2 border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black tracking-wider text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
                  Phase 1
                </span>
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                全效前端视觉壳与交互底座
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                搭建 Web 客端与 Admin
                的骨架，确立高端玻璃拟态设计语言，并完成核心组件的响应式与国际化。
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />{" "}
                  官网动态落地页 (Landing) 建立
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />{" "}
                  极简通行证体系 UI (登录/注册)
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />{" "}
                  抽屉折叠式 Admin 后台页面搭建
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />{" "}
                  全局多语言 i18n JSON 化就绪
                </li>
              </ul>
            </div>

            {/* Phase 2 (In Progress) */}
            <div className="bg-white p-6 rounded-[2rem] border-2 border-[#1E60F2] shadow-xl shadow-blue-900/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-black tracking-wider text-[#1E60F2] uppercase bg-blue-50 px-3 py-1 rounded-full">
                  Phase 2 (当前焦点)
                </span>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E60F2] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1E60F2]"></span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">
                MVP：内容与客联核心 (DB & API)
              </h3>
              <p className="text-sm text-slate-500 mb-6 relative z-10">
                摒弃初期过于庞大的 EA
                与算力系统，优先落地可快速获客并交付服务的客联与内容管理循环。
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700 relative z-10">
                <li className="flex items-start">
                  <CircleDashed className="w-4 h-4 text-[#1E60F2] mr-2 shrink-0 mt-0.5 animate-spin-slow" />{" "}
                  基础数据库 Postgres (Users/RBAC) 建表
                </li>
                <li className="flex items-start">
                  <CircleDashed className="w-4 h-4 text-slate-300 mr-2 shrink-0 mt-0.5" />{" "}
                  发布系统 (Releases) 图文资源库打通
                </li>
                <li className="flex items-start">
                  <CircleDashed className="w-4 h-4 text-slate-300 mr-2 shrink-0 mt-0.5" />{" "}
                  意向表单与客联工单数据接收 API
                </li>
                <li className="flex items-start">
                  <CircleDashed className="w-4 h-4 text-slate-300 mr-2 shrink-0 mt-0.5" />{" "}
                  官网动态化 CMS 渲染替换
                </li>
              </ul>
            </div>

            {/* Phase 3 (Future) */}
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 opacity-80">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black tracking-wider text-slate-500 uppercase bg-slate-200 px-3 py-1 rounded-full">
                  Phase 3 (未来演进)
                </span>
                <Rocket className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                高级量化算力与自动化闭环
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                当系统积累初始 C 端流量后，无缝接入深水区的量化 AI
                模型计算服务以及硬核 EA 执行端。
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li className="flex items-start">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded-full mr-2 shrink-0 mt-0.5" />{" "}
                  接入 Gemini 多模态图表解析器
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded-full mr-2 shrink-0 mt-0.5" />{" "}
                  云端信号长连接 WebSocket 推流总线
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded-full mr-2 shrink-0 mt-0.5" />{" "}
                  客户端 C++ MQL5 EA 心跳握手与收件
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded-full mr-2 shrink-0 mt-0.5" />{" "}
                  订阅付费 (Stripe/PayPal) 网关集成
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline Icon to keep dependencies standalone for this page
function LineChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
