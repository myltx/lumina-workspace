import { NextResponse } from "next/server";
import { prisma } from "@lumina/core";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      category,
      status,
      excerpt,
      content,
      videoUrl,
      downloadUrl,
      tags,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if slug is unique
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return NextResponse.json({ error: "Slug must be unique. This URL path is already taken." }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        category,
        status,
        excerpt: excerpt || content.substring(0, 150) + '...',
        content,
        videoUrl: videoUrl || null,
        downloadUrl: downloadUrl || null,
        tags: tags || null,
        authorId: userId,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("CREATE_POST_ERROR", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
