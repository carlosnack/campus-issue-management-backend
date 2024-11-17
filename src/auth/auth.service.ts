import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';

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
    
    const user = await this.usersService.findOne(email);
    if (!(await bcrypt.compare(pass, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    Reflect.deleteProperty(user, 'passwordHash');
    const jwtPayload = { sub: user.email, username: user.passwordHash };
    return {
      payload: {
        ...user
      },
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }
}