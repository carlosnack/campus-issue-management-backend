import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Issue, IssueEntity } from './entities/issue.entity';
import { createPoint } from 'src/common/utils/spatial';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(IssueEntity)
    private issueRepository: Repository<Issue>,
  ) { }

  create(createIssueDto: CreateIssueDto): Promise<Issue> {
    // Prepara os dados para criação
    const issueData: Partial<Issue> = {
      title: createIssueDto.title,
      description: createIssueDto.description,
      userCreationId: createIssueDto.userCreationId,
    };

    // Se latitude e longitude foram fornecidas, cria o ponto
    if (createIssueDto.latitude && createIssueDto.longitude) {
      issueData.location = {
        type: 'Point',
        coordinates: [createIssueDto.longitude, createIssueDto.latitude]
      };
    }

    const issueCreated = this.issueRepository.create(issueData);
    return this.issueRepository.save(issueCreated);
  }

  async findAll(): Promise<Issue[]> {
    return this.issueRepository.find({
      relations: ['userCreation', 'category'] // Carrega as relações se necessário
    });
  }

  findOne(id: number): Promise<Issue> {
    return this.issueRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateIssueDto: UpdateIssueDto): Promise<UpdateResult> {
    // Se estiver usando Point:
    // if (updateIssueDto.latitude && updateIssueDto.longitude) {
    //   updateIssueDto.location = createPoint(updateIssueDto.latitude, updateIssueDto.longitude);
    // }
    return this.issueRepository.update(id, updateIssueDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.issueRepository.delete(id);
  }

  async findNearby(lat: number, lng: number, radius: number): Promise<Issue[]> {
    return this.issueRepository
      .createQueryBuilder('issue')
      .where(
        'ST_Distance_Sphere(location, ST_GeomFromGeoJSON(:point)) <= :radius',
        {
          point: JSON.stringify({
            type: 'Point',
            coordinates: [lng, lat]
          }),
          radius
        }
      )
      .getMany();
  }

  async findByUser(userId: number) {
    if (isNaN(userId)) {
      throw new Error('ID de usuário inválido recebido no service');
    }

    
    return this.issueRepository.find({
      where: { 
        userCreationId: userId // Converte para string se necessário
      },
    });
  }
}