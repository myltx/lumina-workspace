import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = await req.json();

    if (!username || !password || !name) {
      return new NextResponse("缺失必填字段 (账号或密码)", { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (exist) {
      return new NextResponse("该账号已被注册", { status: 400 });
    }
    
    // Check email unique if provided
    if (email) {
      const emailExist = await prisma.user.findUnique({
        where: { email },
      });
      if (emailExist) {
        return new NextResponse("该邮箱已被绑定", { status: 400 });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email: email || null,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ id: user.id, username: user.username, name: user.name });
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return new NextResponse("服务器内部错误", { status: 500 });
  }
}
