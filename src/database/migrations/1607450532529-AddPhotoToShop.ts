import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddPhotoToShop1607450532529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'shops', 
            new TableColumn({
            name: 'photo',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('shops', 'photo')
    }

}
