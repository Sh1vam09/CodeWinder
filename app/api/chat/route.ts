import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get("teamId"); 
  const chatType = teamId ? "TEAM" : "WORLD";

  const messages = await prisma.message.findMany({
    where: {
      teamId: teamId || null,
      chatType: chatType 
    },
    include: {
      sender: { select: { name: true, image: true, username: true } }
    },
    orderBy: { createdAt: 'asc' },
    take: 50 // Limit to last 50 messages
  });

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { content, teamId } = await req.json();
    const chatType = teamId ? "TEAM" : "WORLD";

    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        teamId: teamId || null,
        chatType
      },
      include: {
        sender: { select: { name: true, image: true } }
      }
    });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: "Error sending message" }, { status: 500 });
  }
}