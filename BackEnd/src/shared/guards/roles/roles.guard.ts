import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // If no roles are defined, allow access
    }

    const response: Response = context.switchToHttp().getResponse();
    const userRole = response.locals.role;
    const hasRole = roles.some(role => role === userRole);

    if (!hasRole) {
      return false;
    }

    return true;
  }
}
