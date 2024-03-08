import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Imports for Config
import { ConfigModule } from '@nestjs/config';
// -----------------------------------------------------

// Imports for mongose
import { MongooseModule } from '@nestjs/mongoose';
// -----------------------------------------------------

// Imports for User
import { UserModule } from './user/user.module';
// -----------------------------------------------------

// // Imports for User
// import { MailerModule } from './mailer/mailer.module';
// // -----------------------------------------------------

@Module({
  imports: [
    // Config env
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // -----------------------------------------------------

    // Config mongose
    MongooseModule.forRoot(process.env.DB_URI),
    // -----------------------------------------------------

    // Config User module
    UserModule,
    // -----------------------------------------------------

    // Config Mailer
    // MailerModule,
    // -----------------------------------------------------
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
