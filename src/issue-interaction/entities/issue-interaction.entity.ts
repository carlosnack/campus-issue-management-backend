import { EntitySchema } from "typeorm";
import { Issue } from "src/issue/entities/issue.entity";
import { User } from "src/users/users.entity";

export class IssueInteraction {
    id: number;
    message: string;
    createdAt: Date;
    isFromSupport: boolean;
    issueId: number;
    userId: number;
    issueIdentifier: Issue;
    userCreation: User;
}

export const IssueInteractionEntity = new EntitySchema<IssueInteraction>({
    name: "issue_interaction",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        message: {
            type: "text",
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
            name: 'created_at'
        },
        isFromSupport: {
            type: Boolean,
            default: false,
            name: 'is_from_support'
        },
        issueId: {
            type: Number,
            name: 'issue_id'
        },
        userId: {
            type: Number,
            name: 'user_id'
        }
    },
    relations: {
        userCreation: {
            type: "many-to-one",
            target: "User",
            joinColumn: { name: 'user_creation_id' },
            onDelete: "CASCADE",
        },
        issueIdentifier: {
            type: "many-to-one",
            target: "issue",
            joinColumn: { name: 'issue_id' },
            onDelete: "CASCADE",
        }

    }
});