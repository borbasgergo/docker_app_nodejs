import { Request, Response } from "express";
import { find_one_by_email, save } from "../repos/UserRepository";
import Bcrypt from "bcrypt"
import { SignJwt } from "../utilities/SignJWT";
import { User } from "../domains/User";

export class AuthController {


    public static async login(req: Request, res: Response){

        const { email, password } = req.body;
        
        const user = await find_one_by_email(email);


        if (user) {

            const user_psw = user.password;
            const id = user.id;
            const email = user.email;

            if ( await Bcrypt.compare(password, user_psw) ) {

                const _jwt = SignJwt({id, email});
            

                return res.json({
                    error: false,
                    _jwt
                })

            } else {

                return res.json({
                    error: true,
                    msg: "Password doesn't match!"
                })

            }

        } else {

            return res.json({
                error: true,
                msg: "No user with the given email!"
            })
        }

    }


    public static async register(req: Request, res: Response){

        const { email, password }  = req.body;

        const _user = new User(email, password);

        const user = await save(_user);

        if(user) {
            return res.json({
                error: false, 
                user
            })
        }
        return res.json({
            error: true,
            msg: "Couldn't be signed up!"
        })

    }
}