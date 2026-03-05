import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lumina/core";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [releases, total] = await Promise.all([
      prisma.release.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true, email: true } } },
      }),
      prisma.release.count(),
    ]);

    return NextResponse.json({ 
      releases, 
      total, 
      page, 
      totalPages: Math.ceil(total / limit) 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "获取列表失败" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const data = await req.json();
    const { version, platform, title, changelog, downloadUrl, isLatest, status } = data;

    // 如果当前版本设为“最新”，则将其余版本取消最新标记
    if (isLatest) {
      await prisma.release.updateMany({
        where: { isLatest: true },
        data: { isLatest: false }
      });
    }

    const release = await prisma.release.create({
      data: {
        version,
        platform: platform || "MT5",
        title,
        changelog,
        downloadUrl,
        isLatest: isLatest || false,
        status: status || "DRAFT",
        authorId: session.user.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    return NextResponse.json(release);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "创建发布失败" }, { status: 500 });
  }
}
