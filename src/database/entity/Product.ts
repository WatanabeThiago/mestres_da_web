import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import Shop from './Shop'

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

    @Column({ default: 0 })
    product_quantity_p: number;

    @Column({ default: 0 })
    product_quantity_m: number;

    @Column({ default: 0 })
    product_quantity_g: number;

    @Column({ default: 0 })
    product_quantity_39: number;

    @Column({ default: 0 })
    product_quantity_40: number;

    @Column({ default: 0 })
    product_quantity_41: number;

    @Column({ default: 0 })
    product_quantity_42: number;

    @Column()
    shop_id: string;
    
    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id'})
    shop: Shop

}