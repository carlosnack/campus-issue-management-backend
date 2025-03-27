import { isNumber } from "util";


export class CreateIssueInteractionDto {
    issueId: number;
    userId: number;
    message: string;
    isFromSupport?: boolean;
}