import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";

import Session from "@/models/Session";
import User from "@/models/User";

import { COOKIE_NAME } from "@/lib/auth/cookies";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get(COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        { status: 401 }
      );
    }

    const session = await Session.findOne({
      sessionToken,
    });

    if (!session) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        { status: 401 }
      );
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({
        _id: session._id,
      });

      return NextResponse.json(
        {
          authenticated: false,
        },
        { status: 401 }
      );
    }

    const user = await User.findById(
      session.userId
    );

    if (!user) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}