// src/entities/types.ts
export type IssueInteractionType = {
    id: number;
    message: string;
    createdAt: Date;
    isFromSupport: boolean;
    issueId: number;
    userId: number;
};

export type IssueType = {
    id: number;
    title: string;
    description: string;
    status: string;
    userCreationId: number;
    createdAt: Date;
};