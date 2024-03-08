import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

// User  Imports---------------------------------------------
import { User } from './schema/user.schema';
import { UserDto } from './user.dto/user.dto';
import { UserService } from './user.service';
// ----------------------------------------------------------

import { MailerService } from 'src/mailer/mailer.service';
import { SendEmailDto } from 'src/mailer/mail.interface';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  async viewallusers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:phone')
  async viewuser(@Param('phone') phone: string): Promise<User | null> {
    if (this.userService.getUser(phone) === null) {
      return;
    } else {
      return this.userService.getUser(phone);
    }
  }

  @Post('/add')
  async createuser(
    @Body() userdata: UserDto,
    @Body('ToMail') Mails: Record<string, string>,
  ): Promise<User> {
    const sendEmail = (body: Record<string, string>) => {
      const dto: SendEmailDto = {
        from: { name: 'Google', address: 'google@ofc.com' },
        recipients: [{ name: body.name, address: body.mail }],
        subject: 'Lucky winner',
        html: '%text%',
        placeholderReplacements: body,
      };
      return this.mailerService.sendEmail(dto);
    };

    const res = await this.userService.addUser(userdata);
    if (res) {
      sendEmail(Mails);
    }
    return res;
  }

  @Delete('/remove/:phone')
  async deleteuser(@Param('phone') phone: string) {
    await this.userService.removeUser(phone);
  }

  @Put('/edit/:phone')
  async updateuser(
    @Param('phone') phone: string,
    @Body() datauser: UserDto,
  ): Promise<User> {
    return await this.userService.modifyUser(phone, datauser);
  }
}
