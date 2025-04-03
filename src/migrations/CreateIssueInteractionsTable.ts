// src/migrations/CreateIssueInteractionsTable.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIssueInteractionsTable implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'issue-interactions',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'message',
                    type: 'text',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'is_from_support',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'issue_id',
                    type: 'int',
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['issue_id'],
                    referencedTableName: 'issue',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['user_id'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('issue-nteractions');
    }
}