import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { log } from 'console';
''
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token não encontrado no cabeçalho Authorization');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });

      // Verifica se o payload contém a estrutura esperada
      if (!payload?.sub) {
        throw new UnauthorizedException('Estrutura do token inválida');
      }
      const userId = Number(payload.sub);
      if (isNaN(userId)) {
        throw new UnauthorizedException('ID de usuário inválido no token');
      }

      // Atribui o usuário de forma padronizada
      request.user = {
        id: userId,
        ...(payload.user || {}) // Inclui outras propriedades se existirem
      };

      return true;
    } catch (err) {
      console.error('Erro ao verificar o token:', err);
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}