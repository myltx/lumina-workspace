import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    const { id } = await params;
    const release = await prisma.release.findUnique({
      where: { id },
    });

    if (!release) return NextResponse.json({ error: "未找到指定的版本记录" }, { status: 404 });
    return NextResponse.json(release);
  } catch (error) {
    return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    if (data.isLatest) {
      await prisma.release.updateMany({
        where: { isLatest: true, id: { not: id } },
        data: { isLatest: false }
      });
    }

    // Determine publishedAt logic if status changed to PUBLISHED
    const currentRelease = await prisma.release.findUnique({ where: { id }});
    let publishedAt = data.publishedAt;
    if (currentRelease?.status !== "PUBLISHED" && data.status === "PUBLISHED") {
      publishedAt = new Date();
    }

    const updatedRelease = await prisma.release.update({
      where: { id },
      data: {
        ...data,
        publishedAt,
      },
    });

    return NextResponse.json(updatedRelease);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.release.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "删除记录失败" }, { status: 500 });
  }
}
