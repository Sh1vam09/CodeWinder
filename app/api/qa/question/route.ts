import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        author: { select: { name: true, image: true } },
        answers: true,
        _count: { select: { answers: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();

    const question = await prisma.question.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json(
      { error: "Error posting question" },
      { status: 500 },
    );
  }
}
