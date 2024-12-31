const nodemailer = require('nodemailer');


const sendOtpEmail=async(email, otp)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // replace with your email and password
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Rox " <${process.env.EMAIL}>`,
            to: email,
            subject: 'Rox One_TIME OTP Verification',
            text: `Your OTP is: ${otp}`,
        };

        const info =
            await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);

    }

}

module.exports={sendOtpEmail};