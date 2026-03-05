import React from "react";
import { prisma } from "@lumina/core";
import {
  Search,
  MessageSquare,
  Clock,
  Briefcase,
  Smartphone,
  MoreHorizontal,
} from "lucide-react";

export default async function LeadsManagementPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "UNREAD":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
            ● 待处理
          </span>
        );
      case "CONTACTED":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E60F2] border border-blue-100">
            ○ 跟进中
          </span>
        );
      case "CONVERTED":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
            ✓ 已转化
          </span>
        );
      case "JUNK":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
            屏蔽/无意向
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            意向线索 (Leads)
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            全盘查收并跟进由官网表单或外部渠道流入的高意向客户线索。
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[var(--shadow-soft)] border border-gray-50 overflow-hidden">
        {/* 工具栏 */}
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full sm:max-w-md focus-within:ring-2 focus-within:ring-[#1E60F2]/20 focus-within:border-[#1E60F2]/50 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="搜索客户姓名、电话或微信号..."
              className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#1E60F2]/20 cursor-pointer w-full sm:w-auto">
              <option value="">所有状态</option>
              <option value="UNREAD">待处理</option>
              <option value="CONTACTED">跟进中</option>
              <option value="CONVERTED">已转化</option>
            </select>
          </div>
        </div>

        {/* 表格区 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  客户基本信息
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  主要联系方式
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider min-w-[300px]">
                  需求描述
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  状态
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  提交时间
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right whitespace-nowrap">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500 font-medium">
                    暂无线索数据
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    {/* 客户基本信息 */}
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1E60F2] flex items-center justify-center font-bold mr-4 shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {lead.name}
                          </div>
                          <div className="text-xs text-slate-500 font-medium flex items-center mt-1">
                            <Briefcase className="w-3.5 h-3.5 mr-1" />
                            {lead.company || "未提供公司"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 主要联系方式 */}
                    <td className="py-4 px-6 align-top">
                      <div className="text-sm font-bold text-slate-700 flex flex-col space-y-1">
                        {lead.phone || lead.wechat ? (
                          <div className="flex items-center text-[#1E60F2]">
                            <Smartphone className="w-4 h-4 mr-1.5" />
                            {lead.phone || lead.wechat}
                          </div>
                        ) : null}
                        {lead.email && (
                          <div className="text-xs text-slate-400 mt-1 truncate max-w-[150px]">
                            {lead.email}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 需求描述 */}
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-start max-w-sm">
                        <MessageSquare className="w-4 h-4 mr-2 text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {lead.message}
                        </p>
                      </div>
                    </td>

                    {/* 状态 */}
                    <td className="py-4 px-6 align-top">
                      {getStatusBadge(lead.status)}
                    </td>

                    {/* 提交时间 */}
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center text-sm text-slate-500 font-medium whitespace-nowrap">
                        <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                        {new Date(lead.createdAt).toLocaleDateString("zh-CN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* 操作 */}
                    <td className="py-4 px-6 text-right align-top">
                      <button className="p-2 text-slate-400 hover:text-[#1E60F2] hover:bg-blue-50 rounded-lg transition-colors inline-block">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 分页区域 */}
        {leads.length > 0 && (
          <div className="p-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between text-sm font-medium text-slate-500 gap-4">
            <div>共 {leads.length} 条线索</div>
            <div className="flex space-x-1">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
                上一页
              </button>
              <button className="px-3 py-1.5 border border-[#1E60F2] bg-[#1E60F2] text-white rounded-lg shadow-sm shadow-blue-500/20">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
