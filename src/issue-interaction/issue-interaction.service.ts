// src/issue-interaction/issue-interaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueInteraction, IssueInteractionEntity } from './entities/issue-interaction.entity';
import { Repository } from 'typeorm';
import { CreateIssueInteractionDto } from './dto/create-issue-interaction.dto';

@Injectable()
export class IssueInteractionService {
  constructor(
    @InjectRepository(IssueInteractionEntity)
    private readonly repo: Repository<IssueInteraction>
  ) { }

  async create(createDto: CreateIssueInteractionDto) {
    // Validação explícita dos IDs
    if (!createDto.issueId || !createDto.userId) {
      throw new Error('IDs de relacionamento são obrigatórios');
    }

    const interaction = this.repo.create({
      ...createDto,
      issueId: createDto.issueId, // Atribuição explícita
      userId: createDto.userId    // Atribuição explícita
    });

    return await this.repo.save(interaction);
  }

  async findByIssueId(issueId: number) {
    return await this.repo.find({
      where: { issueId }, // Filtro pelo ID explícito
      relations: ['user'],
      order: { createdAt: 'ASC' }
    });
  }
}