import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: 'smtp.elasticemail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SMTP_USERNAME,
		pass: process.env.SMTP_PASSWORD
	}
});
