/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  template = (html: string, replacements: Record<string, string>) => {
    return html.replace(/%(\w*)%/g, function (match, key) {
      return replacements.hasOwnProperty(key) ? replacements[key] : '';
    });
  };

  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }

  sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject } = dto;

    const html = dto.placeholderReplacements
      ? this.template(dto.html, dto.placeholderReplacements)
      : dto.html;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const result = transport.sendMail(options);
      return result;
    } catch (error) {
      return error;
    }
  }
}
