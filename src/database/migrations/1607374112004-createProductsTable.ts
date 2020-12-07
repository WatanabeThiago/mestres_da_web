import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProductsTable1607374112004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'product_id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                    isPrimary: true
                },
                {
                    name: 'product_category',
                    type: 'varchar',
                },
                {
                    name: 'product_name',
                    type: 'varchar',
                },
                {
                    name: 'product_about',
                    type: 'varchar'
                },
                {
                    name: 'product_quantity_p',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'product_quantity_m',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'product_quantity_g',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
