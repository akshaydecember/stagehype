import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Interface for comment type (not yet in schema)
interface FilmComment {
  id: string;
  filmId: string;
  userId: string;
  userName: string;
  avatar: string;
  rating: number;
  text: string;
  createdAt: Date;
  helpful: number;
}

export async function GET(request: NextRequest) {
  try {
    const filmId = request.nextUrl.searchParams.get("filmId");
    
    if (!filmId) {
      return NextResponse.json(
        { error: "Film ID is required" },
        { status: 400 }
      );
    }

    // For now return mock comments - schema update needed for Comments model
    const comments: FilmComment[] = [
      {
        id: "1",
        filmId,
        userId: "user1",
        userName: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 5,
        text: "Absolutely brilliant film! The cinematography was stunning and the storytelling kept me engaged throughout.",
        createdAt: new Date("2024-12-20"),
        helpful: 234,
      },
      {
        id: "2",
        filmId,
        userId: "user2",
        userName: "Marcus Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        rating: 4,
        text: "Great production value, though the pacing felt a bit slow in the second half.",
        createdAt: new Date("2024-12-18"),
        helpful: 156,
      },
      {
        id: "3",
        filmId,
        userId: "user3",
        userName: "Elena Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        rating: 5,
        text: "This is what independent cinema should be. Deserves way more recognition!",
        createdAt: new Date("2024-12-15"),
        helpful: 412,
      },
    ];

    return NextResponse.json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { filmId, rating, text } = await request.json();

    // Validation
    if (!filmId || !rating || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (text.trim().length < 5) {
      return NextResponse.json(
        { error: "Comment must be at least 5 characters" },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // For now return mock created comment - need to add Comments model to schema
    const comment: FilmComment = {
      id: Date.now().toString(),
      filmId,
      userId: user.id,
      userName: session.user.name || "Anonymous",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      rating,
      text,
      createdAt: new Date(),
      helpful: 0,
    };

    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
