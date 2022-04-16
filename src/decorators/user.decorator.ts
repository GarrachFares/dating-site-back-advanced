
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//use @User to retrieve user data
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);