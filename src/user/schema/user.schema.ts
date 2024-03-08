import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
