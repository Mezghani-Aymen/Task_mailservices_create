/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

// User  Imports---------------------------------------------
import { User } from './schema/user.schema';
import { UserDto } from './user.dto/user.dto';
import { UserService } from './user.service';
// ----------------------------------------------------------

import { MailerService } from 'src/mailer/mailer.service';
import { SendEmailDto } from 'src/mailer/mail.interface';

import { response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly mailerService: MailerService,
  ) {}
  // ADD try catch blocs for all methods handling the status codes coordinately to the response.
  @Get()
  async viewallusers(): Promise<User[]> {
    try {
      return this.userService.getAllUsers();
    } catch (error) {}
  }

  @Get('/:phone')
  async viewuser(
    @Param('phone') phone: string,
    @Res() response,
  ): Promise<User | null> {
    try {
      if (this.userService.findUser(phone) === null) {
        return;
      } else {
        return this.userService.findUser(phone);
      }
    } catch (error) {}
  }

  @Post('/add')
  async createuser(@Body() userdata: UserDto, @Res() response): Promise<User> {
    try {
      const result = await this.userService.createUser(userdata);
      if (result) {
      }
      return result;
    } catch (error) {}
  }

  @Delete('/remove/:phone')
  async deleteuser(@Param('phone') phone: string, @Res() response) {
    try {
      await this.userService.deleteUser(phone);
    } catch (error) {}
  }

  @Put('/edit/:phone')
  async updateuser(
    @Param('phone') phone: string,
    @Body() datauser: UserDto,
    @Res() response,
  ): Promise<User> {
    try {
      return await this.userService.updateUser(phone, datauser);
    } catch (error) {}
  }
}
