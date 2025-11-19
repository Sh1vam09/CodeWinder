import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth"; // Check your import path for auth
import { headers } from "next/headers";
import { z } from "zod";

// Validation must match your frontend form schema
const profileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal("")),
  githubHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
});

// GET: Pre-fill the form
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        username: true,
        bio: true,
        website: true,
        githubHandle: true,
        twitterHandle: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

// PATCH: Handle the save
export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    // Validate input
    const validatedData = profileSchema.parse(body);

    // Check for username collision if they are changing it
    if (validatedData.username !== session.user.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: validatedData.username },
      });
      if (existingUser && existingUser.id !== session.user.id) {
        return NextResponse.json({ error: "Username already taken" }, { status: 409 });
      }
    }

    // Update database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: validatedData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}