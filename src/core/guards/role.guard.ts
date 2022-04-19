import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/users/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<Role>('role', context.getHandler());

    const req = context.switchToHttp().getRequest();
    const user: User = req.user;

    return user.role === role;
  }
}
