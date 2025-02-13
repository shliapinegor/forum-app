import {ExpressMiddlewareInterface} from "routing-controllers";
import {decodeBase64} from "../utils/utilsForPassword";
import {User} from "../models/User";

export class CheckModerator implements ExpressMiddlewareInterface{
    async use(request: any, response: any, next: (err?: any) => any): Promise<any> {
        const token = request.headers['authorization'];
        const login = decodeBase64((token.split(' '))[1]).split(':')[0]
        const user = await User.findOne({login})
        if(!user!.roles.includes('moderator')){
            response.status(401).send('Access denied. Only moderator and owner have permission')
        }
    }
}