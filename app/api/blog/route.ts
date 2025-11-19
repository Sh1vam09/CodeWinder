import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // Used to fetch the full user object
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// ---------------------------------------------------------
// FIX: Force dynamic
export const dynamic = "force-dynamic";
// ---------------------------------------------------------

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: { select: { name: true, image: true } },
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

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    // 1. Check if user is logged in
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch the user's details including the new isAdmin field
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    });

    // 3. Check for Admin status (SECURITY GATE)
    if (!user || !user.isAdmin) {
      // Forbidden status code (403) for authorized but disallowed action
      return NextResponse.json({ error: "Forbidden: Not an Admin" }, { status: 403 });
    }

    // 4. If admin, proceed with creation
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
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}