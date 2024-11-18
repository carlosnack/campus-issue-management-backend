import { Category } from "src/category/entities/category.entity";
import { User } from "src/users/users.entity";
import { EntitySchema } from "typeorm";

export class Issue {
  id: number;
  title: string;
  description: string;
  userCreationId: string; // FK explícita
  userCreation: User;    // Relacionamento com o User
  categoryId: string;
  category: Category;
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
    },
    description: {
      type: String,
    },
    userCreationId: {
      type: String,
    },
    categoryId: {
      type: String,
    },
  },
  relations: {
    userCreation: { // Nome da relação ajustado para coincidir com o campo relacionado
      type: "many-to-one", // Tipo de relação
      target: "User",      // Nome da entidade relacionada
      joinColumn: {        // Configura o join column (FK)
        name: "userCreationId", // Nome da coluna FK na tabela atual
      },
      onDelete: "CASCADE", // Configuração adicional para comportamento da FK
    },
    category: {
      type: "many-to-one",
      target: "Category",
      joinColumn: {
        name: "categoryId"
      },
      onDelete: "CASCADE"
    }
  },
});
