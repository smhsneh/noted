import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import OTP from "@/models/OTP";

import { resend } from "@/lib/auth/resend";

import {
  generateOTP,
  hashOTP,
  getOTPExpiry,
} from "@/lib/auth/otp";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const email = body.email?.toLowerCase().trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
      const timeSinceLastOTP =
        Date.now() -
        new Date(existingOTP.createdAt).getTime();

      const cooldown = 30 * 1000;

      if (timeSinceLastOTP < cooldown) {
        return NextResponse.json(
          {
            error:
              "Please wait before requesting another OTP",
          },
          { status: 429 }
        );
      }

      await OTP.deleteOne({ email });
    }

    const otp = await generateOTP();

    const otpHash = await hashOTP(otp);

    const expiresAt = getOTPExpiry();

    await OTP.create({
      email,
      otpHash,
      expiresAt,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Noted OTP Code",
      html: `
        <div style="font-family:sans-serif;">
          <h2>Your OTP Code</h2>
          <p>Your verification code is:</p>

          <div style="
            font-size:32px;
            font-weight:bold;
            letter-spacing:4px;
            margin:20px 0;
          ">
            ${otp}
          </div>

          <p>
            This OTP expires in 2 minutes.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}