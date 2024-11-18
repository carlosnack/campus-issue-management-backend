import { EntitySchema } from "typeorm";

export class User {
  id: number;
  name: string;
  email: string;
  picture: string;
  passwordHash: string;
  userRole: string;
}

export const UserEntity = new EntitySchema<User>({
  name: "User", // Corrigido o nome da entidade para refletir "User"
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    picture: {
      type: String,
    },
    passwordHash: {
      type: String,
    },
    userRole: {
      type: String,
    },
  },
});
