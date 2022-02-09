import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";

import { Address } from "./Address"

import Bcrypt from "bcrypt"

@Entity()
export class User extends BaseEntity {

    constructor(email: string, password: string) {
        super()
        this.email = email
        this.password = password
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Address, address => address.user)
    address: Address[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {

        const salt = await Bcrypt.genSalt(10);
        
        const hashedPassword = await Bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
    }

}