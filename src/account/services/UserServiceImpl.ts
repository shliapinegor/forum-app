import UserService from "./UserService";
import NewUserDto from "../dto/NewUserDto";
import UserDto from "../dto/UserDto";
import {User} from "../models/User";
import {ForbiddenError, HttpError, NotFoundError} from "routing-controllers";
import {UpdateDto} from "../dto/UpdateDto";
import {decodeBase64, encodeBase64} from "../utils/utilsForPassword";

export default class UserServiceImpl implements UserService{

    async register(newUserDto: NewUserDto): Promise<UserDto> {
        const find = await User.findOne({login: newUserDto.login})
        if(find) throw new HttpError(404, `User with login = ${newUserDto.login} is already exist`)
        const encode = encodeBase64(newUserDto.password);
        const newUser =  await new User({...newUserDto, password: encode}).save()
        return new UserDto(newUser.login, newUser.roles, newUser.firstName, newUser.lastName)
    }

    async deleteUser(login: string): Promise<UserDto> {
      const find = await User.findOneAndDelete({ login })
        if(!find) throw new HttpError(404, `User with login = ${login} not found`)
        return new UserDto(find.login, find.roles, find.firstName, find.lastName)
    }

    async getUserByLogin(login: string): Promise<UserDto> {
        const find = await User.findOne({login})
        if(!find) throw new HttpError(404, `User with login = ${login} not found`)
        return new UserDto(find.login, find.roles, find.firstName, find.lastName)
    }

    async addRole(login: string, role: string): Promise<UserDto> {
        const res = await User.findOneAndUpdate({login}, {$push: {roles: role}}, {new: true})
        if(!res) throw new HttpError(404, `User with login = ${login} not found`)
        return new UserDto(res.login, res.roles, res.firstName, res.lastName)
    }

    async deleteRole(login: string, role: string): Promise<UserDto> {
        const res = await User.findOneAndUpdate({login}, {$pull: {roles: role}}, {new: true})
        if(!res) throw new HttpError(404, `User with login = ${login} not found`)
        return new UserDto(res.login, res.roles, res.firstName, res.lastName)
    }


    async updateUser(login: string, updateData: UpdateDto): Promise<UserDto> {
        const res = await User.findOneAndUpdate({login}, updateData, {new: true})
        if(!res) throw new HttpError(404, `User with login = ${login} not found`)
        return new UserDto(res.login, res.roles, res.firstName, res.lastName)
    }

    async login(token: string): Promise<UserDto> {
        let [login, password] = decodeBase64((token.split(' '))[1]).split(':')
        const user = await User.findOne({login});
        if(user === null){
            throw new NotFoundError(`User with login ${login} not found`)
        }
        const pass = user.password;
        const encodePass = encodeBase64(password);
        if(pass !== encodePass){
            throw new ForbiddenError('Password is not valid')
        }
        return new UserDto(user.login, user.roles, user.firstName, user.lastName)
    }

}