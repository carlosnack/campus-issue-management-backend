import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer  from 'nodemailer';
import { SendEmailDto } from './mailer.dtos';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService) {}
    mailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: false, // true for port 465, false for other ports
            auth: {
              user: this.configService.get<string>('MAIL_USER'),
              pass: this.configService.get<string>('MAIL_PASSWORD'),
            },
          });
          return transporter;
    }

    async sendEmail(dto: SendEmailDto) {
        const {from, recipients, html, subject,} = dto;
        const transport = this.mailTransport();
        const options: Mail.Options = {
            from: from ?? {
                name: this.configService.get<string>('APPNAME'),
                address: this.configService.get<string>('DEFAULT_MAIL_FROM')
            },
            to: recipients,
            html,
            subject,
        }
        try {
            const result = await transport.sendMail(options);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
