import { Resend } from "resend";

export const sendVerificationEmail = async (email: string, code: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // ! DEVELOPMENT: Print the code to the terminal for easy local testing
  console.log(`\n\n--- EMAIL SIMULATION ---`);
  console.log(`To: ${email}`);
  console.log(`Verification Code: ${code}`);
  console.log(`------------------------\n\n`);

  try {
    const { data, error } = await resend.emails.send({
      // ! NEED TO SETUP CUSTOM DOMAIN FOR PRODUCTION
      from: "NogiDisc <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email address",
      html: `<p>Your verification code is: <strong>${code}</strong></p><p>This code will expire in 15 minutes.</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetLink = `${frontendUrl}/reset-password?token=${token}`;

  // ! DEVELOPMENT: Print the link to the terminal for easy local testing
  console.log(`\n\n--- EMAIL SIMULATION ---`);
  console.log(`To: ${email}`);
  console.log(`Reset Link: ${resetLink}`);
  console.log(`------------------------\n\n`);

  try {
    const { data, error } = await resend.emails.send({
      // ! NEED TO SETUP CUSTOM DOMAIN FOR PRODUCTION
      from: "NogiDisc <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `<p>Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p><p>This link will expire in 15 minutes.</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
    }
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};
