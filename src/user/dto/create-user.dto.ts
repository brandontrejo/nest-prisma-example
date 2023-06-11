import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { EmailUniqueValidator } from 'src/core/validators';

export class CreateUserDto {
  @Validate(EmailUniqueValidator)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
