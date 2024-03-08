import { Module } from '@nestjs/common';

// User  Imports---------------------------------------------
import { UserController } from './user.controller';
import { UserService } from './user.service';
// ----------------------------------------------------------

// Mongoose Imports------------------------------------------
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
// ----------------------------------------------------------

// Mailer Imports------------------------------------------
import { MailerService } from 'src/mailer/mailer.service';
// ----------------------------------------------------------

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, MailerService],
})
export class UserModule {}
