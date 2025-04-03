import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueEntity } from './entities/issue.entity';
import { IssueInteractionService } from 'src/issue-interaction/issue-interaction.service';
import { IssueInteractionEntity } from 'src/issue-interaction/entities/issue-interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity, IssueInteractionEntity,])],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [IssueService, TypeOrmModule],
})
export class IssueModule { }