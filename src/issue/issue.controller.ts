import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException, } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

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
        userCreationId: 1,
        categoryId: 1,
        latitude: -22.1234,  // Exemplo de latitude
        longitude: -48.9876  // Exemplo de longitude
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
  @UseGuards(AuthGuard)
  @Get('/mine')
  async getMineIssues(@Request() req: Request & { user: { id: number } }) {

    if (!req.user?.id || isNaN(req.user.id)) {
      console.error('ID inválido recebido:', req.user?.id);
      throw new BadRequestException('ID de usuário inválido');
    }

    const issues = await this.issueService.findByUser(req.user.id);
    return issues;
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

  // Opcional: Endpoint para buscar issues próximas
  @Get('nearby/:lat/:lng/:radius')
  @ApiOperation({ summary: 'Find nearby issues within radius (in meters)' })
  findNearby(
    @Param('lat') lat: number,
    @Param('lng') lng: number,
    @Param('radius') radius: number
  ) {
    return this.issueService.findNearby(+lat, +lng, +radius);
  }
}