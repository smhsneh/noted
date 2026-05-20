"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [otpSent, setOtpSent] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [cooldown, setCooldown] =
    useState(0);

  const inputRefs = useRef([]);

  const otpValue = otp.join("");

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

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
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setOtpSent(true);

      setCooldown(30);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
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
            otp: otpValue,
          }),
        }
      );

      const data =
        await response.json();

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

  function handleOtpChange(
    value,
    index
  ) {
    if (!/^\d*$/.test(value))
      return;

    const newOtp = [...otp];

    newOtp[index] =
      value.slice(-1);

    setOtp(newOtp);

    if (
      value &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  }

  function handleKeyDown(
    e,
    index
  ) {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      e.key === "Enter"
    ) {
      if (!otpSent) {
        sendOtp();
      } else if (
        otpValue.length === 6
      ) {
        verifyOtp();
      }
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
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e
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
                disabled={
                  loading ||
                  cooldown > 0 ||
                  !email
                }
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "18px",
                  borderRadius:
                    "999px",
                  background:
                    "linear-gradient(90deg, #ffb6c1, #bae6fd, #ddd6fe)",
                  color: "#111",
                  fontSize: "15px",
                  fontWeight:
                    "600",
                  cursor: "pointer",
                  border: "none",
                  opacity:
                    loading ||
                    cooldown > 0
                      ? 0.6
                      : 1,
                }}
              >
                {loading
                  ? "sending otp..."
                  : cooldown > 0
                    ? `resend in ${cooldown}s`
                    : "continue with email"}
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

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  {otp.map(
                    (
                      digit,
                      index
                    ) => (
                      <input
                        key={index}
                        ref={(el) =>
                          (inputRefs.current[
                            index
                          ] = el)
                        }
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(
                            e.target
                              .value,
                            index
                          )
                        }
                        onKeyDown={(
                          e
                        ) =>
                          handleKeyDown(
                            e,
                            index
                          )
                        }
                        style={{
                          width: "60px",
                          height:
                            "64px",
                          borderRadius:
                            "18px",
                          border:
                            "1px solid #ddd",
                          textAlign:
                            "center",
                          fontSize:
                            "28px",
                          fontWeight:
                            "600",
                          outline:
                            "none",
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              <button
                onClick={verifyOtp}
                disabled={
                  loading ||
                  otpValue.length !==
                    6
                }
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "18px",
                  borderRadius:
                    "999px",
                  background:
                    "linear-gradient(90deg, #ffb6c1, #bae6fd, #ddd6fe)",
                  color: "#111",
                  fontSize: "15px",
                  fontWeight:
                    "600",
                  cursor: "pointer",
                  border: "none",
                  opacity:
                    loading ||
                    otpValue.length !==
                      6
                      ? 0.6
                      : 1,
                }}
              >
                {loading
                  ? "verifying..."
                  : "verify otp"}
              </button>

              <button
                onClick={sendOtp}
                disabled={
                  cooldown > 0 ||
                  loading
                }
                style={{
                  background:
                    "transparent",
                  border: "none",
                  color: "#666",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {cooldown > 0
                  ? `resend otp in ${cooldown}s`
                  : "resend otp"}
              </button>
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding:
                  "14px 18px",
                borderRadius:
                  "14px",
                background:
                  "#fef2f2",
                color: "#dc2626",
                fontSize: "14px",
                width: "fit-content",
              }}
            >
              {error}
            </div>
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