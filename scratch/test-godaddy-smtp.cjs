const nodemailer = require('nodemailer');
require('dotenv').config();

const user = process.env.SMTP_USER || 'hello@evoqsolutions.co';
const pass = process.env.SMTP_PASS || 'Kkwkhnhdknkpnh';

console.log(`Testing GoDaddy Mail Authentication for: ${user}`);

async function testServer(name, host, port, secure, requireTLS = false) {
  console.log(`\n--- Testing ${name} (${host}:${port}) ---`);
  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    requireTLS: requireTLS,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });

  try {
    await transporter.verify();
    console.log(`✅ SUCCESS! Connected and authenticated on ${name} (${host}:${port})`);
    return { host, port, secure, requireTLS };
  } catch (err) {
    console.log(`❌ Failed on ${name} (${host}:${port}): ${err.message}`);
    return null;
  }
}

async function run() {
  // Test GoDaddy M365 / Office365
  await testServer('GoDaddy Office365', 'smtp.office365.com', 587, false, true);
  
  // Test GoDaddy Workspace Mail
  await testServer('GoDaddy Workspace (SSL)', 'smtpout.secureserver.net', 465, true);
  await testServer('GoDaddy Workspace (TLS)', 'smtpout.secureserver.net', 587, false, true);

  // Test Google Workspace (if configured via GoDaddy)
  await testServer('Google Workspace', 'smtp.gmail.com', 465, true);
}

run();
