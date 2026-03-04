"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CMSDeleteButton({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("确定要删除这条内容吗？此操作不可逆转！")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/cms/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "删除失败");
      }

      toast.success("内容已成功删除");
      router.refresh(); // 刷新服务端路由列表
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="删除文章">
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
