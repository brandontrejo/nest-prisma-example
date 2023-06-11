import { DatabaseModule } from 'src/core/database/database.module';
import { EmailUniqueValidator } from 'src/core/validators';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailUniqueValidator],
  exports: [UserService],
})
export class UserModule {}
