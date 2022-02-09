import { json } from "body-parser";
import { Request, Response } from "express";
import { User } from "../domains/User";
import { del, find_all, find_one, find_one_for_updates, save } from "../repos/UserRepository";

export class UserController {

    public static async get_one(req: Request, res: Response) {

        const id = req.params.id;

        const user = await find_one(id);

        if(user) {
            return res.json({
                user
            })
        }
        res.json({
            error: "No user!"
        })
    }

    public static async get_all(req: Request, res: Response) {
        const users = await find_all();

        if(users) {
            return res.json({
                error: false,
                users
            })
        }
        res.json({
            error: true,
            msg: "No user!"
        })

    }

    public static async save(req: Request, res: Response) {

        const { email, password } = req.body;
        
        const _user = new User(email, password)

        const user = await save(_user);

        if(user) {
            return res.json({
                error: false, 
                user
            })
        }
        res.json({
            error: true,
            msg: "Couldn't be save!"
        })

    }
    
    public static async update(req: Request, res: Response) {
        
        const uid = req.params.uid;

        const { email, password } = req.body;

        const user = await find_one_for_updates(uid);

        if(user) {

            if (email?.length != 0) {
                user.email = email
            }

            if (password?.length >= 6) {
                user.password = password
            }

        } else {
            return res.json({
                error: true,
                msg: "No user found!"
            })
        }


        const all_new = await save(user);

        if (all_new) {

            return res.json({
                error: false,
                user: {
                    id: user.id, 
                    email:user.email
                }
            })
        }

        return res.json({

            error: true,
            msg: "User couldn't be updated! "
        })
    }

    public static async delete(req: Request, res: Response) {
        
        const id = req.params.id;
        
        const deleted = await del(id);

        if(deleted) {
            return res.json({
                error: false,
                msg: "User has been deleted!"
            })
        }
        
        return res.json({
            error: true,
            msg: "User couldn't be deleted!"
        })
    }

}