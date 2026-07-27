interface Env {
  SMTP_USER?: string;
  SMTP_PASS?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const body: any = await context.request.json();
    const { firstName, lastName, email, phone, preferredDate, preferredTime, companySize, challenge, message, isBookingCall } = body;

    if (!firstName || !lastName || !email) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers,
      });
    }

    const smtpUser = context.env.SMTP_USER || 'hello@evoqsolutions.co';
    const smtpPass = context.env.SMTP_PASS || '5!#Xnh&bD';

    const emailSubject = isBookingCall 
      ? `📅 New Discovery Call Request: ${firstName} ${lastName}` 
      : `💬 New Website Inquiry: ${firstName} ${lastName}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e14; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #1f293d;">
        <h2 style="color: #3b82f6; margin-top: 0;">${emailSubject}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #1f293d; font-weight: bold; color: #9ca3af;">Name</td><td style="padding: 10px; border-bottom: 1px solid #1f293d;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #1f293d; font-weight: bold; color: #9ca3af;">Email</td><td style="padding: 10px; border-bottom: 1px solid #1f293d;"><a href="mailto:${email}" style="color: #60a5fa;">${email}</a></td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #1f293d; font-weight: bold; color: #9ca3af;">Phone</td><td style="padding: 10px; border-bottom: 1px solid #1f293d;">${phone || 'N/A'}</td></tr>
          ${isBookingCall ? `
            <tr><td style="padding: 10px; border-bottom: 1px solid #1f293d; font-weight: bold; color: #9ca3af;">Preferred Date</td><td style="padding: 10px; border-bottom: 1px solid #1f293d; color: #60a5fa; font-weight: bold;">${preferredDate || 'N/A'}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1f293d; font-weight: bold; color: #9ca3af;">1-Hour Time Slot</td><td style="padding: 10px; border-bottom: 1px solid #1f293d; color: #c084fc; font-weight: bold;">${preferredTime || 'N/A'}</td></tr>
          ` : ''}
          <tr><td style="padding: 10px; border-bottom: 1px solid #1f293d; font-weight: bold; color: #9ca3af;">Company Size</td><td style="padding: 10px; border-bottom: 1px solid #1f293d;">${companySize || 'N/A'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #1f293d; font-weight: bold; color: #9ca3af;">Primary Challenge</td><td style="padding: 10px; border-bottom: 1px solid #1f293d;">${challenge || 'N/A'}</td></tr>
        </table>
        ${message ? `<div style="margin-top: 20px; padding: 15px; background: #161b26; border-radius: 12px;"><strong style="color: #9ca3af;">Notes:</strong><p style="margin-top: 5px;">${message}</p></div>` : ''}
      </div>
    `;

    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"EVOQ Website" <${smtpUser}>`,
      to: 'hello@evoqsolutions.co',
      subject: emailSubject,
      html: htmlBody,
      replyTo: email,
    });

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error('Cloudflare Function error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message || 'Server error' }), {
      status: 500,
      headers,
    });
  }
};
