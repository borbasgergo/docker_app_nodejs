import { getRepository } from "typeorm"
import { Address } from "../domains/Address"
import { User } from "../domains/User"
import { find_one } from "./UserRepository"

export const get_addresses_for_user = async (by: string) => {


    const addressRepo = getRepository(Address)

    const user = await find_one(by);

    return await addressRepo.find({ where: {user: user}})

}

export const save = async (address: Address, to: string) => {
    
    const addressRepo = getRepository(Address);

    const user = await find_one(to);

    if(!user) {
        return null;
    }

    address.user = user;
    
    return await addressRepo.save(address);

}

export const refresh = async (new_addr: Address) => {

    const addressRepo = getRepository(Address)

    return await addressRepo.save(new_addr);

}

export const find_address = async (id: string) => {

    const addressRepo = getRepository(Address)

    return await addressRepo.findOne(id);
}

export const del = async (id:string) => {
    
    const addressRepo = getRepository(Address)

    try {
        await addressRepo.delete(id)
        
        return true
    } catch (error) {
        return false
    } 

}