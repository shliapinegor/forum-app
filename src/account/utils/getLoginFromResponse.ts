import {decodeBase64} from "./utilsForPassword";
export function getLoginFromResponse(req: any){
    const token = req.headers['authorization']
    return decodeBase64((token!.split(' '))[1]).split(':')[0]
}