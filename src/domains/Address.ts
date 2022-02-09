import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import {User} from "./User"

@Entity()
export class Address extends BaseEntity {

    constructor(
        street: string,
        house: number
    ) {
        super()
        this.house = house
        this.street = street
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    house: number;

    @ManyToOne(() => User, user => user.address, { onDelete: 'CASCADE' })
    user: User

}