import { Entity, Column, PrimaryGeneratedColumn, EntitySchema } from 'typeorm';

@Entity()
export class Category {
  id: number;
  name: string;
  description: string;
}

export const CategoryEntity = new EntitySchema<Category>({
  name: "Category",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    description:{
      type: String,
    }
  },
})