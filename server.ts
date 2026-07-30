import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Configure Nodemailer transporter with Hostinger SMTP settings
  const smtpUser = process.env.SMTP_USER || "hello@evoqsolutions.co";
  const smtpPass = process.env.SMTP_PASS || "Kkwkhnhdknkpnh";
  const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const recipientEmail = process.env.RECIPIENT_EMAIL || "hello@evoqsolutions.co";

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        preferredDate,
        preferredTime,
        companySize,
        challenge,
        message,
        isBookingCall
      } = req.body;

      if (!email || !firstName || !lastName) {
        return res.status(400).json({ success: false, error: "First Name, Last Name, and Work Email are required." });
      }

      const senderName = `${firstName} ${lastName}`;
      const isBooking = Boolean(isBookingCall || preferredDate || preferredTime);
      const subject = isBooking 
        ? `📅 Call Booking Request from ${senderName}` 
        : `💬 New Message Inquiry from ${senderName}`;
      
      const textBody = `
New Inquiry Received from EVOQ Solutions Website

Type: ${isBooking ? 'Strategy Call Booking' : 'General Message'}
Name: ${senderName}
Work Email: ${email}
Phone Number: ${phone || 'Not provided'}
Preferred Date: ${preferredDate || 'Not specified'}
Preferred Time Slot: ${preferredTime || 'Not specified'}
Company Size: ${companySize || 'Not specified'}
Primary Challenge: ${challenge || 'Not specified'}

Message:
${message || 'No additional message provided.'}
      `.trim();

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 620px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #0a0a0a; padding: 28px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">EVOQ Solutions</h1>
            <p style="color: #3b82f6; margin: 6px 0 0 0; font-size: 14px; font-weight: 600;">
              ${isBooking ? '📅 Strategy Call Booking Request' : '💬 New Contact Message'}
            </p>
          </div>
          <div style="padding: 28px 24px; background-color: #ffffff;">
            
            ${isBooking ? `
              <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 14px 18px; margin-bottom: 24px; border-radius: 6px;">
                <h3 style="color: #1e40af; margin: 0 0 6px 0; font-size: 15px;">Requested Booking Schedule</h3>
                <div style="display: flex; gap: 20px; flex-wrap: wrap; color: #1e3a8a; font-size: 14px;">
                  <div><strong>📆 Preferred Date:</strong> <span style="color: #000; font-weight: 600;">${preferredDate || 'Flexible / Asap'}</span></div>
                  <div><strong>⏰ Time Slot:</strong> <span style="color: #000; font-weight: 600;">${preferredTime || 'Flexible'}</span></div>
                </div>
              </div>
            ` : ''}

            <h2 style="color: #0a0a0a; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">Contact & Company Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
              <tr style="border-bottom: 1px solid #f5f5f5;">
                <td style="padding: 10px 0; font-weight: bold; width: 160px; color: #555;">Name:</td>
                <td style="padding: 10px 0; color: #111; font-weight: 500;">${senderName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f5;">
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Work Email:</td>
                <td style="padding: 10px 0; color: #111;"><a href="mailto:${email}" style="color: #2563eb; font-weight: 500; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f5;">
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Phone Number:</td>
                <td style="padding: 10px 0; color: #111;">${phone ? `<a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>` : 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f5;">
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Preferred Date:</td>
                <td style="padding: 10px 0; color: #111; font-weight: 600; color: #2563eb;">${preferredDate || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f5;">
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Time Slot:</td>
                <td style="padding: 10px 0; color: #111; font-weight: 600; color: #2563eb;">${preferredTime || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f5;">
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Company Size:</td>
                <td style="padding: 10px 0; color: #111;">${companySize || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Primary Challenge:</td>
                <td style="padding: 10px 0; color: #111;">${challenge || 'Not specified'}</td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0 16px 0;" />

            <h3 style="color: #0a0a0a; margin-bottom: 8px; font-size: 16px;">Additional Notes / Message</h3>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; font-size: 14px; white-space: pre-wrap; color: #374151; border: 1px solid #e5e7eb;">${message ? message : 'No additional details provided.'}</div>
          </div>
          <div style="background-color: #f3f4f6; padding: 14px 24px; text-align: center; font-size: 12px; color: #6b7280;">
            Sent automatically via EVOQ Solutions Website Contact Form
          </div>
        </div>
      `;

      // Send mail via SMTP
      const mailInfo = await transporter.sendMail({
        from: `"EVOQ Solutions" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: `"${senderName}" <${email}>`,
        subject: subject,
        text: textBody,
        html: htmlBody,
      });

      console.log(`[SMTP] Email successfully sent to ${recipientEmail}. Message ID: ${mailInfo.messageId}`);

      return res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
      console.error("[SMTP] Error sending contact email:", error);
      return res.status(500).json({ success: false, error: error.message || "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Fallback for SPA routing in production
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
