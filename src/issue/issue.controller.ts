import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Issue')
@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) { }

  @Post()
  @ApiOperation({ summary: 'Create Ticket Issue' }) 
  @ApiBody({
    description: 'Issue data', schema: {
      example: {
        title: 'Titulo do Incidente (Ticket)',
        description: 'Descrição do incidente detalhado',
        userCreationId: 1, // FK explícita
        categoryId: 1,
      }
    }
  })
  create(@Body() createIssueDto: CreateIssueDto) {
    return this.issueService.create(createIssueDto);
  }

  @ApiOperation({ summary: 'Get all issues (Tickets)' }) 
  @Get()
  findAll() {
    return this.issueService.findAll();
  }

  @ApiOperation({ summary: 'Get Issue By Id (ticket)' }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issueService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Issue By Id (ticket)' }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issueService.update(+id, updateIssueDto);
  }

  @ApiOperation({ summary: 'Delete Issue By Id (ticket)' }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issueService.remove(+id);
  }
}
