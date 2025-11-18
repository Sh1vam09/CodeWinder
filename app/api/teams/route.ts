import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const teams = await prisma.team.findMany({
    include: {
      _count: { select: { members: true } },
      createdBy: { select: { name: true } },
    },
  });
  return NextResponse.json(teams);
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description, tags } = await req.json();

    // Transaction: Create team AND add creator as a member
    const team = await prisma.$transaction(async (tx:any) => {
      const newTeam = await tx.team.create({
        data: {
          name,
          description,
          tags: tags || "",
          creatorId: session.user.id,
        },
      });

      await tx.teamMember.create({
        data: {
          teamId: newTeam.id,
          userId: session.user.id,
          role: "OWNER",
        },
      });

      return newTeam;
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating team" }, { status: 500 });
  }
}
