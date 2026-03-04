import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const postId = params.id;
    if (!postId) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE_POST_ERROR", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const postId = params.id;
    if (!postId) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error("GET_POST_ERROR", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const postId = params.id;
    if (!postId) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
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

    const existingPostWithSlug = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPostWithSlug && existingPostWithSlug.id !== postId) {
      return NextResponse.json({ error: "Slug must be unique. This URL path is already taken by another post." }, { status: 400 });
    }

    const oldPost = await prisma.post.findUnique({ where: { id: postId } });

    const post = await prisma.post.update({
      where: { id: postId },
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
        // Set publishedAt if transitioning to PUBLISHED
        publishedAt: (status === 'PUBLISHED' && oldPost?.status !== 'PUBLISHED') ? new Date() : oldPost?.publishedAt,
      }
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error("UPDATE_POST_ERROR", error);
    return NextResponse.json(
      { error: error.message || "Failed to update post" },
      { status: 500 }
    );
  }
}
