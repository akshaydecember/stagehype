import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check moderator role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "MODERATOR")) {
      return NextResponse.json(
        { error: "Forbidden - Moderator access required" },
        { status: 403 }
      );
    }

    // Get pending films
    const pendingFilms = await prisma.film.findMany({
      where: {
        isApproved: false,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      count: pendingFilms.length,
      films: pendingFilms,
    });
  } catch (error) {
    console.error("Get pending films error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
