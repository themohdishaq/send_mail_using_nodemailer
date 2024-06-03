// router.js

const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

router.post("/register", async (req, res) => {
    const { email, subject, message } = req.body; // Extract email, subject, and message from request body

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject, // Set subject from request body
            html: `<h1>${message}</h1>` // Set message from request body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error);
                res.status(500).json({ error: "Failed to send email" });
            } else {
                console.log("Email sent:", info.response);
                res.status(201).json({ status: 201, message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
