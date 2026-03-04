"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, DownloadCloud, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReleaseEditPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    version: "",
    platform: "MT5",
    title: "",
    status: "DRAFT",
    changelog: "",
    downloadUrl: "",
    isLatest: false,
  });

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const res = await fetch(`/api/releases/${params.id}`);
        if (!res.ok) throw new Error("无法拉取版本记录");

        const data = await res.json();
        setFormData({
          version: data.version || "",
          platform: data.platform || "MT5",
          title: data.title || "",
          status: data.status || "DRAFT",
          changelog: data.changelog || "",
          downloadUrl: data.downloadUrl || "",
          isLatest: data.isLatest || false,
        });
      } catch (err: any) {
        toast.error(err.message);
        router.push("/releases");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelease();
  }, [params.id, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = e.target.checked;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "上传失败");

      setFormData((prev) => ({ ...prev, downloadUrl: result.url }));
      toast.success("资源包物理上传入库成功！");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/releases/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "保存失败");
      }

      toast.success("应用版本记录已成功更新！");
      router.push("/releases");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1E60F2]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/releases"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            编辑历史版本包
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            {isPreview ? "返回编辑" : "预览 Changelog"}
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
            覆盖存档记录
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {!isPreview ? (
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    版号 (Version)
                  </label>
                  <input
                    type="text"
                    name="version"
                    required
                    value={formData.version}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 font-mono font-medium outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 placeholder-gray-400"
                    placeholder="如: v2.1.0 Beta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    基座声明 (Platform)
                  </label>
                  <input
                    type="text"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 font-medium outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 placeholder-gray-400"
                    placeholder="如: MT5, Windows"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  发版标题 / 更新重点
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 font-medium sm:text-lg outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 placeholder-gray-400"
                  placeholder="一句话概括，如: 大幅优化了震荡识别引擎"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  版本更新日志 (Changelog)
                  <span className="text-gray-400 font-normal ml-2">
                    (支持 Markdown)
                  </span>
                </label>
                <textarea
                  name="changelog"
                  required
                  rows={15}
                  value={formData.changelog}
                  onChange={handleChange}
                  className="font-mono block w-full px-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 placeholder-gray-400 leading-relaxed"
                  placeholder="### 新增&#10;- 支持自动对冲功能&#10;&#10;### 修复&#10;- 修正了多单开仓时延迟的 Bug"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 sm:p-10 prose prose-slate prose-blue max-w-none">
              {!formData.changelog ? (
                <div className="text-center text-gray-400 py-10">
                  暂无日志内容预览
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.changelog}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              核心实体挂载
            </h3>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-xs font-bold text-slate-600">
                  <DownloadCloud className="w-3.5 h-3.5 mr-1.5" /> 实体文件链接
                </label>
                <label className="cursor-pointer text-xs font-bold text-[#1E60F2] hover:underline flex items-center">
                  {isUploading ? (
                    <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5 mr-1" />
                  )}
                  {isUploading ? "正在解析上传..." : "重新覆盖物理包"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
              <input
                type="url"
                name="downloadUrl"
                value={formData.downloadUrl}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700 font-mono"
                placeholder="文件库相对路径或云存储外链"
              />
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              上线与状态
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                当前状态控制
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 font-medium sm:text-sm outline-none focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 text-gray-700">
                <option value="DRAFT">开发内测期 (草稿态)</option>
                <option value="PUBLISHED">全网发布发行 (上线)</option>
                <option value="DEPRECATED">强行弃用 (下线隐藏)</option>
              </select>
            </div>

            <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">
                  推为最新版本
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 max-w-[150px]">
                  勾选后C端大版面将默认主推此包
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isLatest"
                  checked={formData.isLatest}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E60F2]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
