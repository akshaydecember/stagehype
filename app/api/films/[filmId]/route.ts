import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { filmId: string } }
) {
  try {
    const { filmId } = params;

    // Get film with credits
    const film = await prisma.film.findUnique({
      where: { id: filmId },
      include: {
        credits: {
          include: {
            artist: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    if (!film) {
      return NextResponse.json(
        { error: "Film not found" },
        { status: 404 }
      );
    }

    // Don't return unapproved films unless user is admin
    if (!film.isApproved) {
      return NextResponse.json(
        { error: "Film is not yet approved" },
        { status: 403 }
      );
    }

    // Group credits by role
    const creditsByRole = film.credits.reduce(
      (acc, credit) => {
        if (!acc[credit.role]) {
          acc[credit.role] = [];
        }
        acc[credit.role].push({
          id: credit.artist.id,
          name: credit.artist.email.split("@")[0],
          displayName: credit.artist.profile?.displayName || credit.artist.email,
          role: credit.role,
        });
        return acc;
      },
      {} as Record<string, Array<{ id: string; name: string; displayName: string; role: string }>>
    );

    return NextResponse.json({
      id: film.id,
      title: film.title,
      description: film.description,
      genre: film.genre,
      mood: film.mood,
      year: film.year,
      duration: film.duration,
      language: film.language,
      isApproved: film.isApproved,
      createdAt: film.createdAt,
      credits: creditsByRole,
      allCredits: film.credits,
    });
  } catch (error) {
    console.error("Get film error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
