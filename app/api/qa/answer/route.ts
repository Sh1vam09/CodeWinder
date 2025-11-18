import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { content, questionId } = await req.json();

    const answer = await prisma.answer.create({
      data: {
        content,
        questionId,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(answer);
  } catch (error) {
    return NextResponse.json(
      { error: "Error posting answer" },
      { status: 500 },
    );
  }
}
