import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// ADD THIS LINE TO FORCE DYNAMIC EXECUTION
export const dynamic = "force-dynamic";

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
