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

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        donations: {
          include: {
            film: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get donations where this user is the artist
    const donations = await prisma.donation.findMany({
      where: {
        artistId: user.id,
      },
      include: {
        film: true,
        donor: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate stats
    const totalEarnings = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalFromPlatform = donations.reduce((sum, d) => sum + d.platformFee, 0);
    const creatorEarnings = totalEarnings * 0.9;
    const uniqueSupporters = new Set(donations.map((d) => d.userId)).size;
    const averageDonation = donations.length > 0 ? totalEarnings / donations.length : 0;

    // Get top performing films
    const filmStats = donations.reduce(
      (acc, donation) => {
        if (!donation.film) return acc;
        if (!acc[donation.filmId]) {
          acc[donation.filmId] = {
            filmId: donation.filmId,
            filmTitle: donation.film.title,
            totalDonations: 0,
            donationCount: 0,
            creatorEarnings: 0,
          };
        }
        acc[donation.filmId].totalDonations += donation.amount;
        acc[donation.filmId].donationCount += 1;
        acc[donation.filmId].creatorEarnings += donation.amount * 0.9;
        return acc;
      },
      {} as Record<
        string,
        {
          filmId: string;
          filmTitle: string;
          totalDonations: number;
          donationCount: number;
          creatorEarnings: number;
        }
      >
    );

    const topFilms = Object.values(filmStats)
      .sort((a, b) => b.totalDonations - a.totalDonations)
      .slice(0, 10);

    // Monthly earnings breakdown (last 6 months)
    const monthlyEarnings = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthDonations = donations.filter(
        (d) => d.createdAt >= monthStart && d.createdAt <= monthEnd
      );
      const monthTotal = monthDonations.reduce((sum, d) => sum + d.amount, 0);

      return {
        month: monthStart.toLocaleString("default", { month: "short", year: "2-digit" }),
        earnings: monthTotal * 0.9,
        donations: monthDonations.length,
      };
    }).reverse();

    return NextResponse.json({
      stats: {
        totalEarnings: creatorEarnings,
        totalRawEarnings: totalEarnings,
        platformFees: totalFromPlatform,
        supporters: uniqueSupporters,
        averageDonation,
        totalDonations: donations.length,
      },
      topFilms,
      monthlyEarnings,
      recentDonations: donations.slice(0, 20),
    });
  } catch (error) {
    console.error("Get creator stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
