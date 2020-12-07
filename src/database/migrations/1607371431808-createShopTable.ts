import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createShopTable1607371431808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
        name: 'shops',
            columns: [
                {
                    name: 'shop_id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'shop_name',
                    type: 'varchar',
                },
                {
                    name: 'shop_email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'shop_password',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
