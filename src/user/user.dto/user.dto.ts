import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phone: number;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
