import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  IssueEntity } from './entities/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity])],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [IssueService, TypeOrmModule],
})
export class IssueModule {}