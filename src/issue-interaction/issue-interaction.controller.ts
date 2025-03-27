// src/issue-interaction/issue-interaction.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { IssueInteractionService } from './issue-interaction.service';
import { CreateIssueInteractionDto } from './dto/create-issue-interaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('issue-interactions')
@UseGuards(AuthGuard)
export class IssueInteractionController {
  constructor(private readonly service: IssueInteractionService) { }

  @Post()
  create(@Body() createDto: CreateIssueInteractionDto) {
    return this.service.create(createDto);
  }

  @Get(':issueId')
  findByIssueId(@Param('issueId') issueId: number) {
    return this.service.findByIssueId(issueId);
  }
}