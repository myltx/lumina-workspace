"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function AiChartAnalysisPage() {
  const [activeModel, setActiveModel] = useState("gemini");
  const [inputMode, setInputMode] = useState("image"); // 'image' or 'manual'

  return (
    <div className="space-y-8">
      {/* 头部标题与模型切换 */}
      <header className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ai 图表分析
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-2 font-medium">
            多模型联合分析 | Gemini 3 + GPT-5.1 + Claude Opus 4.5
          </p>
        </div>

        {/* 模型切换胶囊 */}
        <div className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-gray-100 shadow-sm overflow-x-auto max-w-full">
          {["gemini", "gpt", "claude"].map((model) => (
            <button
              key={model}
              onClick={() => setActiveModel(model)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold capitalize transition-all duration-300 whitespace-nowrap ${
                activeModel === model
                  ? "bg-[#1E60F2] text-white shadow-md shadow-blue-500/20"
                  : "text-slate-500 hover:text-slate-900"
              }`}>
              {model}
            </button>
          ))}
        </div>
      </header>

      {/* 主分析视窗 */}
      <div className="bg-white rounded-3xl md:rounded-[2rem] p-6 md:p-8 lg:p-12 shadow-[var(--shadow-soft)] border border-gray-50 min-h-[500px] md:min-h-[600px] flex flex-col">
        {/* 输入模式切换 */}
        <div className="flex items-center justify-center space-x-6 md:space-x-12 mb-8 md:mb-12 border-b border-gray-50 pb-4 md:pb-6">
          <button
            onClick={() => setInputMode("image")}
            className={`flex items-center space-x-1.5 md:space-x-2 text-sm md:text-lg font-bold transition-all ${inputMode === "image" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}>
            {inputMode === "image" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E60F2]"></span>
            )}
            <span>上传 MT5 截图</span>
          </button>
          <button
            onClick={() => setInputMode("manual")}
            className={`flex items-center space-x-1.5 md:space-x-2 text-sm md:text-lg font-bold transition-all ${inputMode === "manual" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}>
            {inputMode === "manual" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E60F2]"></span>
            )}
            <span>手动输入数据</span>
          </button>
        </div>

        {/* 动态输入区域 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {inputMode === "image" ? (
            // 图片拖拽上传区
            <div className="w-full max-w-3xl border-2 border-dashed border-gray-200 rounded-2xl md:rounded-[2rem] p-10 md:p-16 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-200 transition-colors cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6 md:w-8 md:h-8 text-[#1E60F2]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 text-center">
                点击或将图片拖拽到此处上传
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-medium text-center">
                无需添加任何指标，AI分析裸K价格走势
                <br />
                支持 JPG、PNG 格式
              </p>
            </div>
          ) : (
            // 手动数据输入表单
            <div className="w-full max-w-2xl space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    当前价格
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#1E60F2]/20 font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    placeholder="例如: 1950.50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    时间周期
                  </label>
                  <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#1E60F2]/20 font-medium text-slate-900 outline-none transition-all">
                    <option>M15 (15分钟)</option>
                    <option>H1 (1小时)</option>
                    <option>H4 (4小时)</option>
                    <option>D1 (日线)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  技术指标数值 (可选)
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#1E60F2]/20 font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none"
                  placeholder="您可以输入当前的 RSI、MACD 等指标状况..."></textarea>
              </div>
            </div>
          )}
        </div>

        {/* 底部分析控制栏 */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-50 pt-6 md:pt-8 space-y-4 md:space-y-0">
          <div className="flex items-center text-xs md:text-sm font-medium text-slate-400">
            <CheckCircle2 className="w-4 h-4 mr-1.5 md:mr-2 text-green-500" />
            已就绪：
            <span className="text-slate-900 ml-1 capitalize">
              {activeModel}
            </span>
          </div>
          <button className="w-full md:w-auto bg-[#1E60F2] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold shadow-[var(--shadow-float)] hover:-translate-y-1 transition-all duration-300">
            开始生成信号
          </button>
        </div>
      </div>
    </div>
  );
}
