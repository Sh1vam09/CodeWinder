import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { joinCode } = await req.json();

    if (!joinCode || joinCode.length !== 6) {
      return NextResponse.json(
        { error: "Invalid code format" },
        { status: 400 },
      );
    }

    // 1. Find the team
    const team = await prisma.team.findUnique({
      where: { joinCode },
    });

    if (!team) {
      return NextResponse.json({ error: "Invalid join code" }, { status: 404 });
    }

    // 2. Check if user is already a member
    const existingMember = await prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId: team.id,
          userId: session.user.id,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "You are already in this team" },
        { status: 400 },
      );
    }

    // 3. Add user to team
    await prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId: session.user.id,
        role: "MEMBER",
      },
    });

    return NextResponse.json({ success: true, teamId: team.id });
  } catch (error) {
    console.error("Join team error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
