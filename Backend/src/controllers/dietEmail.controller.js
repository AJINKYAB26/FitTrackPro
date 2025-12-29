import nodemailer from "nodemailer";
import User from "../models/User.js";

export const sendDietEmail = async (req, res) => {
  try {
    const userId = req.user.id; // assuming your `protect` middleware sets req.user
    const dietPlan = req.body.dietPlan;

    if (!dietPlan) {
      return res.status(400).json({ message: "Diet plan is required" });
    }

    const user = await User.findById(userId);
    if (!user || !user.email) {
      return res.status(400).json({ message: "User email not found" });
    }

    const email = user.email;

    // Configure nodemailer transporter (use your email credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail or other email
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your AI Generated Diet Plan",
      text: JSON.stringify(dietPlan, null, 2),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Diet plan sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send diet plan", error: err.message });
  }
};
