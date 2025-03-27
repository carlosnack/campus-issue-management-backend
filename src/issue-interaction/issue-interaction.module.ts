// src/issue-interaction/issue-interaction.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueInteractionEntity } from './entities/issue-interaction.entity';
import { IssueInteractionService } from './issue-interaction.service';
import { IssueInteractionController } from './issue-interaction.controller';
import { IssueEntity } from '../issue/entities/issue.entity';
import { UserEntity } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IssueInteractionEntity,
      IssueEntity,
      UserEntity
    ])
  ],
  controllers: [IssueInteractionController],
  providers: [IssueInteractionService],
  exports: [IssueInteractionService]
})
export class IssueInteractionModule { }