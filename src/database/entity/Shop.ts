import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('shops')
export default class Shop {
    @PrimaryGeneratedColumn('uuid')
    shop_id: string;

    @Column()
    shop_name: string;

    @Column()
    shop_email: string;

    @Column()
    shop_password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}