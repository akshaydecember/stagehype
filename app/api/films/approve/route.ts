import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const { filmId, approved } = body;

    if (!filmId || approved === undefined) {
      return NextResponse.json(
        { error: "Missing filmId or approved status" },
        { status: 400 }
      );
    }

    // Update film approval status
    const film = await prisma.film.update({
      where: { id: filmId },
      data: {
        isApproved: approved,
      },
    });

    return NextResponse.json({
      message: `Film ${approved ? "approved" : "rejected"}`,
      film,
    });
  } catch (error) {
    console.error("Film approval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
