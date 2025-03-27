import { PartialType } from '@nestjs/swagger';
import { CreateIssueInteractionDto } from './create-issue-interaction.dto';

export class UpdateIssueInteractionDto extends PartialType(CreateIssueInteractionDto) {}
