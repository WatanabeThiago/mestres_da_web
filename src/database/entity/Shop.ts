import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcrypt from 'bcryptjs'

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