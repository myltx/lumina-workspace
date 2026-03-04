import React from "react";
import Link from "next/link";
import {
  Plus,
  DownloadCloud,
  MoreVertical,
  Edit2,
  CheckCircle2,
  CircleDashed,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export default async function AdminReleasesPage() {
  const releases = await prisma.release.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            应用版本与分发库
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            独立管理的 C 端客户软件版本库、更新日志表与实体挂载链路。
          </p>
        </div>
        <Link
          href="/releases/new"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-[1rem] shadow-sm text-sm font-bold text-white bg-[#1E60F2] hover:bg-[#1748b6] transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          发布新版本
        </Link>
      </div>

      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  版本与平台
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  发布标题
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  焦点指引
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  状态
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  发布时间
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {releases.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500">
                    <p className="font-medium">当前版本库为空</p>
                    <p className="text-sm mt-1 text-slate-400">
                      点击右上角"发布新版本"开始创建您的第一个安装包分发。
                    </p>
                  </td>
                </tr>
              ) : (
                releases.map((release) => (
                  <tr
                    key={release.id}
                    className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-50 text-[#1E60F2] p-2 rounded-xl">
                          <DownloadCloud className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-slate-900">
                            {release.version}
                          </div>
                          <div className="text-xs font-medium text-slate-500">
                            {release.platform}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm font-bold text-slate-900 max-w-xs truncate"
                        title={release.title}>
                        {release.title}
                      </div>
                      <div className="text-xs text-slate-500 max-w-xs truncate mt-1">
                        包含实体包: {release.downloadUrl ? "是" : "否"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {release.isLatest ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#1E60F2] text-white">
                          C端主推 (最新)
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                          历史版本
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {release.status === "PUBLISHED" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> 已上线
                        </span>
                      ) : release.status === "DEPRECATED" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                          已废弃
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <CircleDashed className="w-3 h-3 mr-1" /> 草稿待上
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                      {release.publishedAt
                        ? dayjs(release.publishedAt).format("YYYY-MM-DD HH:mm")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/releases/${release.id}/edit`}
                        className="p-2 text-slate-400 hover:text-[#1E60F2] hover:bg-blue-50 rounded-xl transition-colors inline-block"
                        title="编辑版本">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
