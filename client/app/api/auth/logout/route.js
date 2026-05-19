import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";

import Session from "@/models/Session";

import {
  COOKIE_NAME,
  clearSessionCookie,
} from "@/lib/auth/cookies";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get(COOKIE_NAME)?.value;

    if (sessionToken) {
      await Session.deleteOne({
        sessionToken,
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.headers.set(
      "Set-Cookie",
      clearSessionCookie()
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to logout",
      },
      { status: 500 }
    );
  }
}