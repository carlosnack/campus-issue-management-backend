import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './users.dtos';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }
}
