import { User } from "../domains/User";

import jwt from "jsonwebtoken"

export const SignJwt = (
    userObj: {id: number, email: string}
) => {

    return jwt.sign(userObj, process.env.JWT as string, { expiresIn: '1800s' })

}