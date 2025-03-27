import { EntitySchema } from "typeorm";
import { IssueType } from "../../entities/types";
import { User } from "src/users/users.entity";
import { IssueInteraction } from "src/issue-interaction/entities/issue-interaction.entity";

export class Issue implements IssueType {
  id: number;
  title: string;
  description: string;
  status: string;
  userCreationId: number;
  userCreation: User;
  interactions: IssueInteraction[];
  createdAt: Date;
  location: any;
}

export const IssueEntity = new EntitySchema<Issue>({
  name: "issue",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
      length: 100
    },
    description: {
      type: "text",
      nullable: false
    },
    status: {
      type: String,
      default: 'TO-DO',
      length: 30
    },
    userCreationId: {
      type: Number,
      name: 'user_creation_id'
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      name: 'created_at',
      nullable: false,
    },
  },
  relations: {
    userCreation: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: 'user_creation_id' },
      onDelete: "CASCADE",
    },
    interactions: {
      type: "one-to-many",
      target: "IssueInteraction",
      inverseSide: "issue"
    }
  }
});