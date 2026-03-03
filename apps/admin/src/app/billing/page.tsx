import React from "react";
import {
  DollarSign,
  Download,
  ExternalLink,
  ArrowRightLeft,
} from "lucide-react";

export default function BillingManagementPage() {
  const transactions = [
    {
      id: "TXN-98421",
      user: "zhangsan@example.com",
      amount: "$199.00",
      plan: "Pro 订阅包 (月度)",
      date: "2026-03-03 14:22:10",
      status: "已完成",
    },
    {
      id: "TXN-98420",
      user: "wangwu@test.com",
      amount: "$999.00",
      plan: "EA 终身授权版",
      date: "2026-03-03 10:15:45",
      status: "已完成",
    },
    {
      id: "TXN-98419",
      user: "lishi_demo@a.com",
      amount: "$49.00",
      plan: "基础算力包",
      date: "2026-03-02 22:30:00",
      status: "处理中",
    },
    {
      id: "TXN-98418",
      user: "anonymous_8x@mail.com",
      amount: "$199.00",
      plan: "Pro 订阅包 (月度)",
      date: "2026-03-02 09:12:11",
      status: "已退款",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            账单与订单
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            监控平台流水，处理退款申请及支付异常反馈。
          </p>
        </div>
        <button className="bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 px-5 py-2.5 rounded-xl font-bold flex items-center shadow-sm transition-all hover:-translate-y-0.5">
          <Download className="w-5 h-5 mr-2" />
          导出 Excel 财务报表
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#1E60F2] to-blue-500 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <p className="text-blue-100 font-bold mb-2">本月累计总入金</p>
          <h2 className="text-4xl font-black mb-4">$128,450.00</h2>
          <div className="flex items-center text-sm font-bold bg-white/20 w-max px-3 py-1 rounded-full backdrop-blur-md">
            <span>环比上月 +14.2%</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-[var(--shadow-soft)] border border-gray-50 flex flex-col justify-center">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mr-3">
              <ArrowRightLeft className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-slate-500 font-bold">成功处理订单 (笔)</p>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-2">1,245</h2>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-[var(--shadow-soft)] border border-gray-50 flex flex-col justify-center">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
              <DollarSign className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-slate-500 font-bold">待处理退款申请</p>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            12 <span className="text-sm text-slate-400 font-medium">笔</span>
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[var(--shadow-soft)] border border-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">最近流水明细</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  流水号 / 时间
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  购买人
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  订阅内容
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  支付金额
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  当前状态
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{txn.id}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      {txn.date}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-600">
                    {txn.user}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-md text-sm">
                      {txn.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-black text-slate-900 text-lg">
                    {txn.amount}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        txn.status === "已完成"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : txn.status === "处理中"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-red-50 text-red-600 border border-red-100"
                      }`}>
                      {txn.status === "已完成" ? "已到账" : txn.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-sm font-bold text-[#1E60F2] hover:text-[#1748b6] inline-flex items-center">
                      详情 <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
