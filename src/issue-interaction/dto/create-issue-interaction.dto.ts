import { isNumber } from "util";


export class CreateIssueInteractionDto {
    issueId: number;
    userCreationId: number;
    message: string;
    isFromSupport?: boolean;
}