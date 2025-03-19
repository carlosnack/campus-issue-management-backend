import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './users.dtos';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/')
    @ApiOperation({ summary: 'Create User' }) 
    @ApiBody({
    description: 'User data', schema: {
      example: {
        name: 'Nome do usuário',
        email: 'usuário@unesp.br',
        picture: 'urlPicture',
        userRole: 'normal',
        extras: {
            password: 'senha',
            passwordConfim: 'senha'
        },
    }
    }
  })
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }
}
