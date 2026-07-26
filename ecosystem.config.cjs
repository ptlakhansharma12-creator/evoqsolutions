module.exports = {
  apps: [
    {
      name: "evoq-solutions",
      script: "dist/server.cjs",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3000,
        SMTP_USER: "hello@evoqsolutions.co",
        SMTP_PASS: "5!#Xnh&bD"
      }
    }
  ]
};
