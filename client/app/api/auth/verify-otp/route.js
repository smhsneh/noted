import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import OTP from "@/models/OTP";
import User from "@/models/User";
import Session from "@/models/Session";

import { verifyOTP } from "@/lib/auth/otp";

import {
  generateSessionToken,
  getSessionExpiry,
} from "@/lib/auth/session";

import { createSessionCookie } from "@/lib/auth/cookies";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const email = body.email?.toLowerCase().trim();
    const otp = body.otp?.trim();

    if (!email || !otp) {
      return NextResponse.json(
        {
          error: "Email and OTP are required",
        },
        { status: 400 }
      );
    }

    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return NextResponse.json(
        {
          error: "OTP not found",
        },
        { status: 404 }
      );
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ email });

      return NextResponse.json(
        {
          error: "OTP expired",
        },
        { status: 400 }
      );
    }

    if (otpRecord.attempts >= 5) {
      await OTP.deleteOne({ email });

      return NextResponse.json(
        {
          error:
            "Too many failed attempts",
        },
        { status: 429 }
      );
    }

    const isValidOTP = await verifyOTP(
      otp,
      otpRecord.otpHash
    );

    if (!isValidOTP) {
      otpRecord.attempts += 1;

      await otpRecord.save();

      return NextResponse.json(
        {
          error: "Invalid OTP",
        },
        { status: 401 }
      );
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
      });
    }

    const sessionToken =
      generateSessionToken();

    const expiresAt = getSessionExpiry();

    await Session.create({
      userId: user._id,
      sessionToken,
      expiresAt,
    });

    await OTP.deleteOne({ email });

    const response = NextResponse.json({
      success: true,
      message:
        "OTP verified successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });

    response.headers.set(
      "Set-Cookie",
      createSessionCookie(sessionToken)
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to verify OTP",
      },
      { status: 500 }
    );
  }
}