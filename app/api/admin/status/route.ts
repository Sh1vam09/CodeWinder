import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Force dynamic is recommended for session-dependent server logic
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session || !session.user) {
            // Not logged in
            return NextResponse.json({ isAdmin: false, isLoggedIn: false }, { status: 200 });
        }

        // Fetch the user to get the isAdmin status
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { isAdmin: true },
        });

        // Determine the status
        const isAdmin = user?.isAdmin === true;

        return NextResponse.json({ isAdmin: isAdmin, isLoggedIn: true }, { status: 200 });

    } catch (error) {
        console.error("Error checking admin status:", error);
        return NextResponse.json({ isAdmin: false, isLoggedIn: false, error: "Server Error" }, { status: 500 });
    }
}