import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, genre, mood, year, durationMin, language } = body;

    // Validate required fields
    if (!title || !description || !genre || !mood || !year || !durationMin) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create film (not approved by default)
    const film = await prisma.film.create({
      data: {
        title,
        description,
        genre,
        mood,
        year,
        durationMin,
        language,
        isApproved: false, // Requires admin approval
      },
    });

    return NextResponse.json(
      {
        message: "Film uploaded successfully",
        film,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Film upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    // Only admins can view all films, others see only published
    const films = await prisma.film.findMany({
      where: user?.role === "ADMIN" ? {} : { isApproved: true },
      include: {
        credits: {
          include: {
            artist: true,
          },
        },
        donations: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ films });
  } catch (error) {
    console.error("Get films error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
