import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// 1. Helper function to generate a random 6-digit code
function generateJoinCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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

    // 2. Generate a unique join code
    let joinCode = generateJoinCode();
    let isUnique = false;

    // Simple retry logic to ensure the code is unique
    while (!isUnique) {
      const existing = await prisma.team.findUnique({ where: { joinCode } });
      if (!existing) isUnique = true;
      else joinCode = generateJoinCode();
    }

    // 3. Transaction: Create team with the new joinCode
    const team = await prisma.$transaction(async (tx: any) => {
      const newTeam = await tx.team.create({
        data: {
          name,
          description,
          tags: tags || "",
          joinCode: joinCode, // <--- This field is required now!
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
    console.error("Error creating team:", error);
    return NextResponse.json({ error: "Error creating team" }, { status: 500 });
  }
}
