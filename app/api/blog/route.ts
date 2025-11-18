import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET: Fetch all blog posts
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: { select: { name: true, image: true } }, // select specific fields
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

// POST: Create a new blog post
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
