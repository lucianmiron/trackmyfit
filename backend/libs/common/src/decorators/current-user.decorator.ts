import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@app/common/database/entities/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
);
