import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  // Fetch upcoming or active contests
  const contests = await prisma.contest.findMany({
    where: {
      endTime: { gt: new Date() },
    },
    orderBy: { startTime: "asc" },
  });
  return NextResponse.json(contests);
}
