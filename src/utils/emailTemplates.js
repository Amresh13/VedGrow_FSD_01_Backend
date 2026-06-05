import env from '../config/env.js';

export const verifyEmailTemplate = (token) => ({
  subject: 'Verify your email address',
  html: `
    <h1>Email Verification</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${env.clientUrl}/verify-email?token=${token}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Verify Email</a>
    <p>This link expires in 24 hours.</p>
  `,
});

export const resetPasswordTemplate = (token) => ({
  subject: 'Reset your password',
  html: `
    <h1>Password Reset</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${env.clientUrl}/reset-password?token=${token}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a>
    <p>This link expires in 15 minutes.</p>
    <p>If you did not request this, ignore this email.</p>
  `,
});
