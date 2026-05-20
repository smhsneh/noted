export async function sendOTPEmail(
  email,
  otp
) {
  const response = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "api-key":
          process.env.BREVO_API_KEY,
      },

      body: JSON.stringify({
        sender: {
          name: "Noted",
          email: process.env.BREVO_SENDER,
        },

        to: [{ email }],

        subject: "Your Noted OTP Code",

        htmlContent: `
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
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error);
  }
}