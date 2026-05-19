import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  otpHash: {
    type: String,
    required: true,
  },

  attempts: {
    type: Number,
    default: 0,
  },

  expiresAt: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.OTP ||
  mongoose.model("OTP", OTPSchema);