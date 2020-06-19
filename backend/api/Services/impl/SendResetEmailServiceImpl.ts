import nodemailer from 'nodemailer';
import generateResetLink from '../../Utils/generateResetLink';
import SendResetEmailService from '../SendResetEmailService';

class SendResetEmailServiceImpl implements SendResetEmailService {

    async sendEmailTo(email: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AAP_EMAIL,
                pass: process.env.APP_EMAIL_PASSWORD,
            },
        });

        const resetLink = generateResetLink(email);

        const mailOptions = {
            from: '"TheHunter Missions" <thehuntermissions@gmail.com>',
            to: email,
            subject: 'Reset password',
            text: `Seems like you forgot your password at TheHunter Missions, if it is true, click in the link below to reset your password.\n\n${resetLink}\n\nIf you did not forgot your password you can safetly ignore this email.`,
        };

        await transporter.sendMail(mailOptions);
    }

}

export default SendResetEmailServiceImpl;