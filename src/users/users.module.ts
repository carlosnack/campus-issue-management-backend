import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.provider';

@Module({
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
