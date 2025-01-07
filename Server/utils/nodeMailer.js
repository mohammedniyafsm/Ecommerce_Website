const nodemailer = require('nodemailer');

const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Ensure you are using the correct service
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your app password
      },
    });

    const mailOptions = {
      from: `"MOMIN CLOTHING" <${process.env.EMAIL}>`,
      to: email,
      subject: 'MOMIN CLOTHING: Email Verification',
      text: `${otp} is your MOMIN CLOTHING verification code. \n\nPlease enter this code to verify your email. \n\nThank you, \nMOMIN CLOTHING Team.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return { success: true, message: 'OTP email sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error);

    return { success: false, message: 'Failed to send OTP email.', error };
  }
};

module.exports = { sendOtpEmail };
