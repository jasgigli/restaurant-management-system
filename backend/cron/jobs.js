const cron = require("node-cron");
const nodemailer = require("nodemailer");
const logger = require("../config/logger");

// Placeholder: configure your transporter with real credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Monthly payroll reminder (1st of every month at 8am)
cron.schedule("0 8 1 * *", async () => {
  logger.info("Running monthly payroll reminder job");
  // TODO: Generate payroll reminders or draft salary expense records
});

// Daily low-stock check (every day at 7am)
cron.schedule("0 7 * * *", async () => {
  logger.info("Running daily low-stock check job");
  // TODO: Check for low-stock items and send email to admin
  // Example:
  // const lowStockItems = await StoreItem.findAll({ where: { quantity: { [Op.lt]: 10 } } });
  // if (lowStockItems.length) {
  //   await transporter.sendMail({
  //     from: process.env.EMAIL_USER,
  //     to: 'admin@example.com',
  //     subject: 'Low Stock Alert',
  //     text: 'Some items are low in stock.'
  //   });
  // }
});

module.exports = cron;
