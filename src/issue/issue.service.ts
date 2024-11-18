import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Issue, IssueEntity } from './entities/issue.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(IssueEntity)
    private issueRepository: Repository<Issue>,
  ) { }

  create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const issueCreated = this.issueRepository.create(createIssueDto);

    return this.issueRepository.save(issueCreated);
  }

  async findAll(): Promise<Issue[] | undefined> {
    return this.issueRepository.findBy({});
  }

  findOne(id: number): Promise<Issue> {
    return this.issueRepository.findOne({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateIssueDto): Promise<UpdateResult> {
    const updatedCategory = this.issueRepository.update({ id }, updateCategoryDto);
    return updatedCategory;
  }

  remove(id: number): Promise<DeleteResult> {
    const removedCategory = this.issueRepository.delete({ id });
    return removedCategory;
  }
}
