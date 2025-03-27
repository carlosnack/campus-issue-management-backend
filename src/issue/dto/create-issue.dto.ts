// create-issue.dto.ts
export class CreateIssueDto {
    title: string;
    description: string;
    userCreationId: number;
    categoryId: string;
    latitude?: number;
    longitude?: number;
}

// update-issue.dto.ts
export class UpdateIssueDto {
    title?: string;
    description?: string;
    categoryId?: string;
    location?: any;
}