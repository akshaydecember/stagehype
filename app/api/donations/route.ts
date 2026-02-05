import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { amount, filmId, artistId } = body;

    // Validation
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    if (!filmId && !artistId) {
      return NextResponse.json(
        { error: "Either filmId or artistId is required" },
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

    // Create donation
    const donation = await prisma.donation.create({
      data: {
        amount,
        platformFee: amount * 0.1, // 10% platform fee
        userId: user.id,
        filmId: filmId || null,
        artistId: artistId!,
      },
    });

    // Calculate creator amount (90%)
    const creatorAmount = amount * 0.9;

    return NextResponse.json(
      {
        message: "Donation successful",
        donation: {
          id: donation.id,
          amount,
          creatorAmount,
          platformFee: donation.platformFee,
          timestamp: donation.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Donation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get user's donations
    const donations = await prisma.donation.findMany({
      where: { userId: user.id },
      include: {
        film: true,
        artist: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ donations });
  } catch (error) {
    console.error("Get donations error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
