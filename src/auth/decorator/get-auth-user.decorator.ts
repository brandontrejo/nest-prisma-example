import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthUser } from 'src/auth/dto';

export const GetAuthUser = createParamDecorator(
  (_data, ctx: ExecutionContext): AuthUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
