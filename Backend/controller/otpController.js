const nodemailer = require("nodemailer");
const OtpModel = require("../model/otpSchema");
const UserModel = require("../model/userModel");

const sendOTPMail = async (email, otp) => {
    try {
        let mailer = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.SEND_OTP_MAIL_USER,
                pass: process.env.SEND_OTP_MAIL_PASSWORD,
            },
        });
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your OTP Code</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .email-container {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        width: 90%;
                        max-width: 600px;
                    }
                    .header {
                        background-color: #007bff;
                        color: #ffffff;
                        padding: 10px;
                        border-radius: 8px 8px 0 0;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        margin: 20px 0;
                        background-color: #f0f0f0;
                        padding: 10px;
                        border-radius: 4px;
                        display: inline-block;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #888;
                        text-align: center;
                    }
                    .footer a {
                        color: #007bff;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1>Cloud Home </h1>
                    </div>
                    <div class="content">
                        <h2>Your OTP Code</h2>
                        <p>Use the following OTP to complete your authentication:</p>
                        <div class="otp">${otp}</div>
                        <p>This OTP is valid for 10 minutes.</p>
                    </div>
                    <div class="footer">
                        <p>If you didn't request this, please ignore this email.</p>
                        <p>&copy; 2024 Cloud Home. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const response = await mailer.sendMail({
            from: "abcd",
            to: email,
            subject: "OTP",
            html: htmlContent,
        });
        // console.log(response);

        return true;
    } catch (err) {
        console.log("--------------------------------");
        console.log(err);
        console.log("--------------------------------");

        return false;
    }
};


const generateOtp = async (req, res) => {
    try {
        const { email, _id: userId } = req.user;
        const restrictedTimeForOtp = 10 * 60 * 1000;
        console.log("Email------------->", email);
        console.log("userId------------->", userId);

        const sentOTPMail = await OtpModel.findOne({
            email,
            createdAt: {
                $gte: Date.now() - restrictedTimeForOtp,
            },
        });
        console.log("SentOtpMail", sentOTPMail);

        if (sentOTPMail) {
            res.status(201);
            res.json({
                status: "already sent",
                message: `OTP already sent to ${email}`,
                data: {
                    createdAt: sentOTPMail.createdAt,
                },
            });
            return;
        }

        // generate Random OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const isMailSent = await sendOTPMail(email, otp);

        if (!isMailSent) {
            res.status(500);
            res.json({
                status: "Fail",
                message: `Your Email: ${email} is not correct`,
                data: {},
            });
            return;
        }

        // create a entry in database with that OTP
        await OtpModel.create({
            otp,
            email,
            userId,
        });


        res.status(201);
        res.json({
            status: "success",
            message: `Otp sent to ${email}`,
            data: {},
        });
    } catch (err) {
        console.log("----------------------------");
        console.log(err);
        console.log("----------------------------");
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error in generateOtp",
            data: err,
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const { email } = req.user;
        const restrictedTimeForOtp = 10 * 60 * 1000;//milliseconds
        const sentOTPMail = await OtpModel.findOne({
            email,
            createdAt: {
                $gte: Date.now() - restrictedTimeForOtp,
            },
        });

        if (!sentOTPMail) {
            res.status(404)
            res.json({
                status: "fail",
                message: "Verification failed, Please generate new OTP!",
            });
            return;
        }

        const hashedOtp = sentOTPMail.otp;
        const isCorrect = sentOTPMail.verifyOtp(otp + "", hashedOtp);

        if (!isCorrect) {
            res.status(400)
            res.json({
                status: "fail",
                message: "OTP not matched"
            });
            return;
        }

        await UserModel.findOneAndUpdate({ email }, { isEmailVerified: true });
        res.status(200);
        res.json({
            status: "success",
            message: "Verification Successful",
            data: {},
        });
    } catch (error) {
        console.log("----------------------------");
        console.log(err);
        console.log("----------------------------");
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error in VerifyOtp",
            data: err,
        });
    }
}


module.exports = { generateOtp, verifyOtp };