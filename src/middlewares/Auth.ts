import { NextFunction, Request, Response } from "express";
import { CheckJwt } from "../utilities/CheckJWT";

export const AuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return res.status(403).json({
            error: true,
            msg: "Unauthenticated!"
        })
    }

    if(!CheckJwt(token)) {
        return res.status(403).json({
            error: true,
            msg: "Unauthenticated!"
        })
    }

    //Authenticated
    next()

}
