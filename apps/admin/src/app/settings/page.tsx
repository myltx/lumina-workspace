import React from "react";
import { Save, Shield, Globe, BellRing } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          系统全局设置
        </h1>
        <p className="mt-2 text-slate-500 font-medium">
          配置平台各项底层参数，确保前台交易逻辑的顺畅运行。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧导航 - 示意性 */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center justify-between px-5 py-4 bg-white border border-[#1E60F2] rounded-2xl text-[#1E60F2] font-bold shadow-md shadow-blue-500/10 transition-all">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-3" />
              安全与合规
            </div>
          </button>

          <button className="w-full flex items-center justify-between px-5 py-4 bg-transparent hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl text-slate-500 hover:text-slate-900 font-bold transition-all">
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-3 text-slate-400" />
              节点与服务器
            </div>
          </button>

          <button className="w-full flex items-center justify-between px-5 py-4 bg-transparent hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl text-slate-500 hover:text-slate-900 font-bold transition-all">
            <div className="flex items-center">
              <BellRing className="w-5 h-5 mr-3 text-slate-400" />
              通知渠道与模板
            </div>
          </button>
        </div>

        {/* 右侧表单区 */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-[var(--shadow-soft)] border border-gray-50 pb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            安全与合规配置
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                最高风险敞口 (Percentage)
              </label>
              <input
                type="number"
                defaultValue={15}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 outline-none transition-all font-medium text-slate-900"
              />
              <p className="text-xs text-slate-400 mt-2 font-medium">
                全局限制任何自动交易所能亏损的最大净值比例。
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                系统维护模式
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 outline-none transition-all font-medium text-slate-900 cursor-pointer">
                <option value="off">关闭 (正常运行)</option>
                <option value="on">开启 (前台暂停服务)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                强制二次验证 (2FA)
              </label>
              <div className="flex items-center space-x-3 mt-2">
                <div className="w-12 h-6 bg-[#1E60F2] rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></div>
                </div>
                <span className="text-sm font-bold text-slate-600">
                  已为所有管理员开启
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 mt-8 flex justify-end">
              <button className="bg-[#1E60F2] hover:bg-[#1748b6] text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-[var(--shadow-float)] transition-all hover:-translate-y-0.5">
                <Save className="w-4 h-4 mr-2" />
                保存配置更改
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
