// src/issue-interaction/issue-interaction.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueInteractionEntity } from './entities/issue-interaction.entity';
import { IssueInteractionService } from './issue-interaction.service';
import { IssueInteractionController } from './issue-interaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IssueInteractionEntity,
    ])
  ],
  controllers: [IssueInteractionController],
  providers: [IssueInteractionService],
  exports: [IssueInteractionService]
})
export class IssueInteractionModule { }