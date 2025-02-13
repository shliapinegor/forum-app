import {ExpressMiddlewareInterface} from "routing-controllers";
import {decodeBase64, encodeBase64} from "../utils/utilsForPassword";
import {User} from "../models/User";

export class AuthMiddleware implements ExpressMiddlewareInterface{
    async use(request: any, response: any, next: (err?: any) => any) {
    const token = request.headers['authorization'];
    if(!token){
        response.status(401).send('Access denied')
    }
        let [login, password] = decodeBase64((token.split(' '))[1]).split(':')
        const user = await User.findOne({login});
        if(user === null){
            response.status(404).send('Not Found')
        }
        const pass = user!.password;
        const encodePass = encodeBase64(password);
        if(pass !== encodePass){
            response.status(404).send('Password is not valid')
        }
        next()

    }
}