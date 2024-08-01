import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/app/enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
      
     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler, context.getClass()])
     
     if(!requiredRoles) {
         return true;
     }

    
     const { user } = context.switchToHttp().getRequest();
     
     const filteredRole = requiredRoles.filter(role => role === user.role)


     return filteredRole.length > 0
  }
}