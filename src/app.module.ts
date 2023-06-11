import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.modeule';
import { configValidationSchema } from './core/config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
