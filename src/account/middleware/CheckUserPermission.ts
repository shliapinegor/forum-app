import {ExpressMiddlewareInterface} from "routing-controllers";
import {decodeBase64} from "../utils/utilsForPassword";

export class CheckUserPermission implements ExpressMiddlewareInterface{
    async use(request: any, response: any, next: (err?: any) => any): Promise<any> {
        const token = request.headers['authorization'];
        const loginFromAuth = decodeBase64((token.split(' '))[1]).split(':')[0]

        const loginFromRequest = request.params.login;
        if(loginFromRequest && loginFromAuth !== loginFromRequest){
            response.status(401).send('Access denied. Only owner have permission')
        }

        const authorFromRequest = request.params.author;
        if(authorFromRequest && authorFromRequest !== loginFromAuth){
            response.status(401).send('Access denied. Only author have permission')
        }


        next();
    }
}