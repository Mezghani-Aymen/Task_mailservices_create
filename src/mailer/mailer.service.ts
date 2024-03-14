/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  private async readMailHtml(): Promise<string> {
    const filePath = join(__dirname, '../..', 'public', 'mail.html');
    try {
      const htmlContent = await readFile(filePath, 'utf-8');
      return htmlContent;
    } catch (error) {
      console.error('Error reading mail.html:', error);
      throw new Error('Failed to read mail.html');
    }
  }

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

  async sendEmail(bodyMail: Record<string, string>) {
    const dto = {
      from: {
        name: this.configService.get<string>('MAIL_SENDER'),
        address: this.configService.get<string>('EMAIL_SENDER'),
      },
      recipients: [{ name: bodyMail.name, address: bodyMail.mail }],
      subject: bodyMail.subject,
      html: bodyMail.text,
    };
    const htmlContent = await this.readMailHtml();
    const subject = dto.subject;
    const html = this.template(htmlContent, { name: bodyMail.name });
    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: dto.from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: dto.recipients,
      subject,
      html,
    };

    try {
      const result = transport.sendMail(options);
      return result;
    } catch (error) {}
  }
}
