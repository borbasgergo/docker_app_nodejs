import { getRepository } from "typeorm"
import { User } from "../domains/User"

export const find_one = async (id: string) => {

    const userRepo = getRepository(User);

    const user = await userRepo.findOne(id)

    return user;

}

export const find_one_for_updates =async (id:string) => {
    const userRepo = getRepository(User);
    
    return await userRepo.findOne({where: {id}, select: ["email", "id", "password"]})


}

export const find_one_by_email = async (email:string) => {
    
    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ where: { email }, select: ["email", "id", "password"]});

    return user;
}

export const find_all = async () => {
    
    const userRepo = getRepository(User);

    const all_user = await userRepo.find();

    return all_user;

}

export const save = async (new_user: User) => {
    
    const userRepo = getRepository(User);

    const user = await userRepo.save(new_user);

    return user;
}

export const del = async (id:string): Promise<boolean> =>{
    
    const userRepo = getRepository(User);

    try {

        await userRepo.delete(id);

        return true;

    } catch (error) {

        return false;
    }


}