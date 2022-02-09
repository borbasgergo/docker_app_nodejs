
import jwt from "jsonwebtoken"

export const CheckJwt =  (token: string) => {

    try {
        jwt.verify(token, process.env.JWT as string)

        return true;
    } catch (_) {
        return false;
    }
    

}