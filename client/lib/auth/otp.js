import bcrypt from "bcryptjs";

export async function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function hashOTP(otp) {
  return bcrypt.hash(otp, 10);
}

export async function verifyOTP(otp, otpHash) {
  return bcrypt.compare(otp, otpHash);
}

export function getOTPExpiry() {
  return new Date(Date.now() + 2 * 60 * 1000);
}