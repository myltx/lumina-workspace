import React from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ShieldCheck,
  Mail,
  Clock,
} from "lucide-react";

export default function UsersManagementPage() {
  const users = [
    {
      id: "USR-001",
      name: "马云龙",
      email: "myl@luminaworkspace.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2 分钟前",
      mt5Serial: "SYS-MASTER-001",
      expireDate: "2099-12-31",
    },
    {
      id: "USR-002",
      name: "张三交易员",
      email: "zhangsan@example.com",
      role: "Pro User",
      status: "Active",
      lastLogin: "1 小时前",
      mt5Serial: "VIP-ZSN-8892",
      expireDate: "2026-10-01",
    },
    {
      id: "USR-003",
      name: "李四测试",
      email: "lisi@example.com",
      role: "Free User",
      status: "Inactive",
      lastLogin: "3 天前",
      mt5Serial: "-",
      expireDate: "未激活",
    },
    {
      id: "USR-004",
      name: "王五宽客",
      email: "wangwu@test.com",
      role: "EA License",
      status: "Active",
      lastLogin: "12 分钟前",
      mt5Serial: "PRO-WWK-1102",
      expireDate: "2025-12-01",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            用户管理
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            查看并管理平台所有注册用户、权限及状态。
          </p>
        </div>
        <button className="bg-[#1E60F2] hover:bg-[#1748b6] text-white px-5 py-2.5 rounded-xl font-bold flex items-center shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
          <Plus className="w-5 h-5 mr-2" />
          新增用户
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[var(--shadow-soft)] border border-gray-50 overflow-hidden">
        {/* 工具栏 */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full max-w-sm focus-within:ring-2 focus-within:ring-[#1E60F2]/20 focus-within:border-[#1E60F2]/50 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="搜索 UID、邮箱或用户名..."
              className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="flex space-x-3">
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#1E60F2]/20 cursor-pointer">
              <option>所有角色</option>
              <option>Super Admin</option>
              <option>Pro User</option>
            </select>
          </div>
        </div>

        {/* 表格区 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  用户信息
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  角色权限
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  MT5 授权状态
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  最近登录
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1E60F2] flex items-center justify-center font-bold mr-4">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500 font-medium flex items-center mt-0.5">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-600">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      {user.role}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-mono font-bold text-slate-800">
                        {user.mt5Serial}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        到期: {user.expireDate}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-slate-500 font-medium">
                      <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}>
                      {user.status === "Active" ? "● 活跃" : "○ 离线/封禁"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-colors font-bold text-xs bg-blue-50 border border-blue-100 mr-2">
                      修改 MT5 授权
                    </button>
                    <button className="p-2 text-slate-400 hover:text-[#1E60F2] hover:bg-blue-50 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页伪装 */}
        <div className="p-4 border-t border-gray-50 flex items-center justify-between text-sm font-medium text-slate-500">
          <div>共 {users.length} 数据条目</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">
              上一页
            </button>
            <button className="px-3 py-1 border border-[#1E60F2] bg-[#1E60F2] text-white rounded-md">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
