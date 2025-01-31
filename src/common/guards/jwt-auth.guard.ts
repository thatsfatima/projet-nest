import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  static jwtService: any;
  
  static getUserId(authHeader: string): string {
    if (!authHeader) {
      throw new UnauthorizedException('Token manquant.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token manquant.');
    }

    const payload = this.jwtService.verify(token);

    return payload.sub;
  }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
  
    console.log('Authorization Header:', authHeader);
  
    if (!authHeader) {
      throw new UnauthorizedException('Veuillez vous identifier.');
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token manquant.');
    }
    
    return super.canActivate(context);
  }

  static isAdmin(authHeader: string): boolean {
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token manquant.');
    }

    const payload = this.jwtService.verify(token);
    const userRole = payload.role;

    return userRole === 'ADMIN';
  }
}