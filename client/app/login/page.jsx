"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function sendOtp() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setOtpSent(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      router.push("/board/1");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* left */}

        <div
          style={{
            padding: "90px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              fontSize: "18px",
              color: "#111",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform:
                "lowercase",
            }}
          >
            noted.
          </div>

          <h1
            style={{
              fontSize: "68px",
              lineHeight: 0.95,
              color: "#111",
              marginBottom: "20px",
              fontWeight: "700",
              letterSpacing: "-4px",
              textTransform:
                "lowercase",
            }}
          >
            login
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "15px",
              lineHeight: 1.6,
              marginBottom: "42px",
              width: "380px",
            }}
          >
            continue building your
            infinite spatial
            workspace.
          </p>

          {!otpSent ? (
            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "16px",
                width: "420px",
              }}
            >
              <div>
                <p
                  style={{
                    marginBottom:
                      "10px",
                    fontSize: "13px",
                    color: "#444",
                    fontWeight:
                      "600",
                    textTransform:
                      "lowercase",
                  }}
                >
                  email
                </p>

                <input
                  type="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value,
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "18px",
                    borderRadius:
                      "18px",
                    border:
                      "1px solid #ddd",
                    background:
                      "white",
                    outline: "none",
                    fontSize: "15px",
                    color: "#111",
                  }}
                />
              </div>

              <button
                onClick={sendOtp}
                disabled={loading}
                onMouseEnter={(e) => {
                  const gradient =
                    e.currentTarget.querySelector(
                      ".gradient-fill",
                    );

                  const white =
                    e.currentTarget.querySelector(
                      ".inner-white",
                    );

                  gradient.style.opacity =
                    1;

                  white.style.opacity =
                    0;
                }}
                onMouseLeave={(e) => {
                  const gradient =
                    e.currentTarget.querySelector(
                      ".gradient-fill",
                    );

                  const white =
                    e.currentTarget.querySelector(
                      ".inner-white",
                    );

                  gradient.style.opacity =
                    0;

                  white.style.opacity =
                    1;
                }}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "18px",
                  borderRadius:
                    "999px",
                  background:
                    "white",
                  color: "#111",
                  fontSize: "15px",
                  fontWeight:
                    "600",
                  cursor: "pointer",
                  position:
                    "relative",
                  overflow:
                    "hidden",
                  border: "none",
                  transition:
                    "all 0.35s ease",
                }}
              >
                {/* pastel glow */}

                <div
                  style={{
                    position:
                      "absolute",
                    inset: 0,
                    borderRadius:
                      "999px",
                    background:
                      "linear-gradient(90deg, rgba(255,182,193,1), rgba(186,230,253,1), rgba(221,214,254,1))",
                    filter:
                      "blur(18px)",
                    transform:
                      "scale(1.25)",
                    opacity: 1,
                  }}
                />

                {/* gradient fill */}

                <div
                  className="gradient-fill"
                  style={{
                    position:
                      "absolute",
                    inset: 0,
                    borderRadius:
                      "999px",
                    background:
                      "linear-gradient(90deg, #ffb6c1, #bae6fd, #ddd6fe)",
                    opacity: 0,
                    transition:
                      "opacity 0.35s ease",
                  }}
                />

                {/* white inner */}

                <div
                  className="inner-white"
                  style={{
                    position:
                      "absolute",
                    inset: "2px",
                    borderRadius:
                      "999px",
                    background:
                      "white",
                    transition:
                      "opacity 0.35s ease",
                  }}
                />

                {/* text */}

                <span
                  style={{
                    position:
                      "relative",
                    zIndex: 10,
                    color: "#111",
                  }}
                >
                  {loading
                    ? "sending otp..."
                    : "continue with email"}
                </span>
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "16px",
                width: "420px",
              }}
            >
              <div>
                <p
                  style={{
                    marginBottom:
                      "10px",
                    fontSize: "13px",
                    color: "#444",
                    fontWeight:
                      "600",
                    textTransform:
                      "lowercase",
                  }}
                >
                  otp
                </p>

                <input
                  type="text"
                  placeholder="enter otp"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value,
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "18px",
                    borderRadius:
                      "18px",
                    border:
                      "1px solid #ddd",
                    background:
                      "white",
                    outline: "none",
                    fontSize: "15px",
                    color: "#111",
                  }}
                />
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading}
                onMouseEnter={(e) => {
                  const gradient =
                    e.currentTarget.querySelector(
                      ".gradient-fill",
                    );

                  const white =
                    e.currentTarget.querySelector(
                      ".inner-white",
                    );

                  gradient.style.opacity =
                    1;

                  white.style.opacity =
                    0;
                }}
                onMouseLeave={(e) => {
                  const gradient =
                    e.currentTarget.querySelector(
                      ".gradient-fill",
                    );

                  const white =
                    e.currentTarget.querySelector(
                      ".inner-white",
                    );

                  gradient.style.opacity =
                    0;

                  white.style.opacity =
                    1;
                }}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "18px",
                  borderRadius:
                    "999px",
                  background:
                    "white",
                  color: "#111",
                  fontSize: "15px",
                  fontWeight:
                    "600",
                  cursor: "pointer",
                  position:
                    "relative",
                  overflow:
                    "hidden",
                  border: "none",
                  transition:
                    "all 0.35s ease",
                }}
              >
                {/* pastel glow */}

                <div
                  style={{
                    position:
                      "absolute",
                    inset: 0,
                    borderRadius:
                      "999px",
                    background:
                      "linear-gradient(90deg, rgba(255,182,193,1), rgba(186,230,253,1), rgba(221,214,254,1))",
                    filter:
                      "blur(18px)",
                    transform:
                      "scale(1.25)",
                    opacity: 1,
                  }}
                />

                {/* gradient fill */}

                <div
                  className="gradient-fill"
                  style={{
                    position:
                      "absolute",
                    inset: 0,
                    borderRadius:
                      "999px",
                    background:
                      "linear-gradient(90deg, #ffb6c1, #bae6fd, #ddd6fe)",
                    opacity: 0,
                    transition:
                      "opacity 0.35s ease",
                  }}
                />

                {/* white inner */}

                <div
                  className="inner-white"
                  style={{
                    position:
                      "absolute",
                    inset: "2px",
                    borderRadius:
                      "999px",
                    background:
                      "white",
                    transition:
                      "opacity 0.35s ease",
                  }}
                />

                {/* text */}

                <span
                  style={{
                    position:
                      "relative",
                    zIndex: 10,
                    color: "#111",
                  }}
                >
                  {loading
                    ? "verifying..."
                    : "verify otp"}
                </span>
              </button>
            </div>
          )}

          {error && (
            <p
              style={{
                color: "red",
                marginTop: "20px",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* right */}

        <div
          style={{
            position: "relative",
            background: "white",
            overflow: "hidden",
            borderLeft:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {/* black dots */}

          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(#111 1.4px, transparent 1.4px)",
              backgroundSize:
                "14px 14px",
              opacity: 0.9,
              clipPath:
                "polygon(45% 0%, 100% 0%, 100% 100%, 70% 100%, 52% 68%, 70% 48%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "90px",
              left: "70px",
            }}
          >
            <h2
              style={{
                fontSize: "56px",
                lineHeight: 0.95,
                color: "#111",
                fontWeight: "700",
                letterSpacing:
                  "-3px",
              }}
            >
              think
              <br />
              spatially.
            </h2>

            <p
              style={{
                marginTop: "24px",
                color: "#666",
                width: "320px",
                lineHeight: 1.7,
                fontSize: "14px",
              }}
            >
              organize ideas,
              connect thoughts,
              and build your second
              brain visually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}