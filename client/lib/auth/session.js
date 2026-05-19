import crypto from "crypto";

export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function getSessionExpiry() {
  return new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );
}