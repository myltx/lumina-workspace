import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "没有找到文件提交" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 生成安全唯一的文件名，保留原有扩展名
    const ext = file.name.split('.').pop();
    const uniqueName = `${uuidv4()}.${ext}`;

    // 将上传的文件直接推送到 Web 项目的 public 目录下，以便 C 端可以直接下载或回显
    const uploadDir = path.join(process.cwd(), "../web/public/uploads");
    
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    // 返回的 URL 路径为 C 端 (Web) 的相对路径
    const clientUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({ 
      success: true, 
      url: clientUrl,
      originalName: file.name
    });
  } catch (error) {
    console.error("上传错误:", error);
    return NextResponse.json({ error: "文件上传失败" }, { status: 500 });
  }
}
