import {  BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './users.dtos';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({where: {email}})
  }

  async create(user: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({where: {email: user.email}});
    if(userExists) {
      throw new BadRequestException('Email already registered');
    }
    const passwordHash = await this.createHashPassword(user.extras.password, user.extras.passwordConfirm);
    delete user.extras;
    const userCreated =  this.usersRepository.create({...user, passwordHash});

    return this.usersRepository.save(userCreated);
  }
  createHashPassword(password: string, passwordConfirm: string) {
    console.log(password);
    console.log(passwordConfirm);
    if (password != passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }
    return bcrypt.hash(password, 10);
  }
}