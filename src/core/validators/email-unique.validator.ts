import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const exists = await this.userRepository.getUserByEmail(value);

    if (exists) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `Email already exists`;
  }
}
