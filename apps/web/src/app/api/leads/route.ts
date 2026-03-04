import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, wechat, phone, email, company, message, source } = body;

    // Validate simple requirements
    if (!name || !message || (!wechat && !phone && !email)) {
      return new NextResponse("缺失必填字段 (需要姓名、留言以及至少一项联系方式)", { status: 400 });
    }

    // Insert into DB
    const lead = await prisma.lead.create({
      data: {
        name,
        wechat,
        phone,
        email,
        company,
        message,
        source: source || "Web Contact Form",
      },
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("LEAD_SUBMIT_ERROR:", error);
    return new NextResponse("服务器内部异常，请稍后重试", { status: 500 });
  }
}
