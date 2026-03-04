"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Link2, Film, Tag } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CMSNewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "ANNOUNCEMENT",
    status: "DRAFT",
    excerpt: "",
    content: "",
    videoUrl: "",
    downloadUrl: "",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug from title if slug is empty
    if (name === "title" && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/cms/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "发布失败");
      }

      toast.success("内容已成功发布/保存！");
      router.push("/cms");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/cms"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            发布新内容
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            {isPreview ? "返回编辑" : "预览效果"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-[1rem] shadow-[var(--shadow-float)] text-sm font-bold text-white bg-[#1E60F2] hover:bg-[#1748b6] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E60F2] disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {formData.status === "PUBLISHED" ? "立即发布" : "保存草稿"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {!isPreview ? (
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  文章标题
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-lg outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 placeholder-gray-400"
                  placeholder="请输入引人入胜的标题..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  正文内容{" "}
                  <span className="text-gray-400 font-normal ml-2">
                    (支持 Markdown 语法)
                  </span>
                </label>
                <textarea
                  name="content"
                  required
                  rows={20}
                  value={formData.content}
                  onChange={handleChange}
                  className="font-mono appearance-none block w-full px-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 transition-all sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 placeholder-gray-400 leading-relaxed"
                  placeholder="## 输入内容标题&#10;&#10;开始书写您的精彩内容..."
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 sm:p-10 prose prose-slate prose-blue max-w-none">
              {!formData.content ? (
                <div className="text-center text-gray-400 py-10">
                  暂无内容以供预览
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              发布设置
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                状态
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 font-medium sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700">
                <option value="DRAFT">草稿 (仅自己可见)</option>
                <option value="PUBLISHED">立即发布</option>
                <option value="ARCHIVED">归档 (隐藏)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                信息分类
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 font-medium sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700">
                <option value="ANNOUNCEMENT">系统公告</option>
                <option value="TUTORIAL">教学与研报</option>
                <option value="RELEASE">软件更新与资源</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                自定义 URL 缩略名 (Slug)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700 font-mono"
                placeholder="例如: v2-release-notes"
              />
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              高级附加属性
            </h3>

            <div>
              <label className="flex items-center text-xs font-bold text-slate-600 mb-2">
                <Link2 className="w-3.5 h-3.5 mr-1.5" /> 资源下载链接
              </label>
              <input
                type="url"
                name="downloadUrl"
                value={formData.downloadUrl}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="flex items-center text-xs font-bold text-slate-600 mb-2">
                <Film className="w-3.5 h-3.5 mr-1.5" /> 教学视频链接
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700"
                placeholder="输入油管或B站链接..."
              />
            </div>

            <div>
              <label className="flex items-center text-xs font-bold text-slate-600 mb-2">
                <Tag className="w-3.5 h-3.5 mr-1.5" /> 检索标签
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700"
                placeholder="用逗号分隔，如: EA教学, 外汇"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                列表摘要短叙
              </label>
              <textarea
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700 resize-none"
                placeholder="可选。如果不填系统将自动截取正文前50字..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
