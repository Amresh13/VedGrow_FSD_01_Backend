import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { createHash, createRandomToken } from '../utils/hashToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import { verifyEmailTemplate, resetPasswordTemplate } from '../utils/emailTemplates.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const user = await User.create({ name, email, password, isVerified: true });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified } },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified } },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }

    const hashedToken = createHash(token);
    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    const verifyToken = createRandomToken();
    user.verifyToken = createHash(verifyToken);
    user.verifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    await sendEmail({ to: user.email, ...verifyEmailTemplate(verifyToken) });

    res.json({ success: true, message: 'Verification email resent' });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const resetToken = createRandomToken();
    user.resetToken = createHash(resetToken);
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    await sendEmail({ to: user.email, ...resetPasswordTemplate(resetToken) });

    res.json({ success: true, message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const hashedToken = createHash(token);
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified } });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};
