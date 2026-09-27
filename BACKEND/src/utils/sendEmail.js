// backend/src/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error("EMAIL_USER or EMAIL_PASS missing in .env");
  }

  // Zoho Mail SMTP Configuration
  // Note: If your Zoho account is Indian (.in), use "smtppro.zoho.in".
  // If your Zoho account is global/US (.com), use "smtppro.zoho.com".
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.in", // Use "smtppro.zoho.com" if your domain is registered on global Zoho
    port: 465,
    secure: true, // SSL
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"VOXCEL NOVA Support" <${emailUser}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};