import React from "react";
import { prisma } from "@/lib/prisma";
import { Plus, Search, FileText, Edit } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import CMSDeleteButton from "./components/CMSDeleteButton";

export const dynamic = "force-dynamic";

export default async function CMSManagementPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true, username: true },
      },
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            已发布
          </span>
        );
      case "DRAFT":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            草稿
          </span>
        );
      case "ARCHIVED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            已归档
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "ANNOUNCEMENT":
        return (
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            系统公告
          </span>
        );
      case "TUTORIAL":
        return (
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
            干货研报
          </span>
        );
      case "RELEASE":
        return (
          <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md">
            软件下发
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            内容管理系统 (CMS)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            管理官方频道的文章、通告、教学视频与公开资源下发
          </p>
        </div>
        <Link
          href="/cms/new"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-[1rem] shadow-sm text-sm font-medium text-white bg-[#1E60F2] hover:bg-[#1748b6] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E60F2]">
          <Plus className="w-4 h-4 mr-2" />
          发布新内容
        </Link>
      </div>

      {/* Control Panel */}
      <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 sm:text-sm transition-all"
            placeholder="搜索文章标题..."
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  标题内容
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  创建人/时间
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">
                        还没有发布过任何内容
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        点击右上角"发布新内容"开始
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px] mt-0.5">
                            {post.excerpt || "暂无摘要"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(post.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-gray-900 font-medium">
                        {post.author?.name ||
                          post.author?.username ||
                          "未知作者"}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/cms/${post.id}/edit`}
                          className="p-2 text-gray-400 hover:text-[#1E60F2] hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <CMSDeleteButton postId={post.id} />
                      </div>
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
