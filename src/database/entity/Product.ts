import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column()
    product_category: string;

    @Column()
    product_name: string;

    @Column()
    product_about: string;

    @Column()
    product_quantity_p: number;

    @Column()
    product_quantity_m: number;

    @Column()
    product_quantity_g: number;
    

}