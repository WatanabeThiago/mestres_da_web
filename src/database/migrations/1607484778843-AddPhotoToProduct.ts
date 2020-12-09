import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPhotoToProduct1607484778843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products', 
            new TableColumn({
            name: 'product_photo',
            type: 'varchar',
            isNullable: true,
            default: 'blank.jpg'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'product_photo')
    }

}
