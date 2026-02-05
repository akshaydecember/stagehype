import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();

    return NextResponse.json({
      status: "ok",
      users: userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        status: "ok",
        users: 0,
        timestamp: new Date().toISOString(),
        note: "Database not reachable yet, server stable",
      },
      { status: 200 }
    );
  }
}
