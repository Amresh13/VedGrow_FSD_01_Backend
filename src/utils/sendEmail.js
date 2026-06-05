import nodemailer from 'nodemailer';
import env from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: env.smtp.from,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
};
