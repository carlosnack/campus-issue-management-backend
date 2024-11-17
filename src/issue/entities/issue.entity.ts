import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  userCreationId: string;

  @Column()
  categoryId: string;
}