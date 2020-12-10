import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class RelationShopProduct1607376497256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'shop_id',
                type: 'uuid',
                isNullable: true,
            })
        )

        await queryRunner.createForeignKey('products', new TableForeignKey({
            name: 'ShopProducts',
            columnNames: ['shop_id'],
            referencedColumnNames: ['shop_id'],
            referencedTableName: 'shops',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ShopProducts')

        await queryRunner.dropColumn('products', 'provide_id')
    }

}
