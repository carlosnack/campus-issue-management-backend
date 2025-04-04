import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ payload: User, access_token: string }> {
    
    const user = await this.usersService.findByEmail(email);
    if(!user) {
      throw new UnauthorizedException('User or email does not match');
    }
    if (!(await bcrypt.compare(pass, user.passwordHash))) {
      throw new UnauthorizedException('User or email does not match');
    }
    const jwtPayload = { sub: user.id, password: user.passwordHash, user };
    Reflect.deleteProperty(user, 'passwordHash');
    
    return {
      payload: {
        ...user
      },
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }
}