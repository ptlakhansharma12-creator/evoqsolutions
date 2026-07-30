const nodemailer = require('nodemailer');
require('dotenv').config();

const user = process.env.SMTP_USER || 'hello@evoqsolutions.co';
const pass = process.env.SMTP_PASS || 'Kkwkhnhdknkpnh';

console.log(`Testing SMTP Auth for User: ${user} / Pass length: ${pass.length}`);

async function testPort(port, secure) {
  console.log(`\n--- Testing smtp.hostinger.com on Port ${port} (secure: ${secure}) ---`);
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: port,
    secure: secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });

  try {
    await transporter.verify();
    console.log(`SUCCESS: Port ${port} authenticated successfully!`);
    return true;
  } catch (err) {
    console.error(`FAILED on Port ${port}:`, err.message);
    return false;
  }
}

async function run() {
  const p465 = await testPort(465, true);
  const p587 = await testPort(587, false);
  
  if (!p465 && !p587) {
    console.log('\n❌ Authentication failed on both ports. The password in Hostinger hPanel might be different or has special characters.');
  }
}

run();
