import UserService from "./UserService";
import NewUserDto from "../dto/NewUserDto";
import UserDto from "../dto/UserDto";
import {User} from "../models/User";
import {HttpError} from "routing-controllers";
import {UpdateDto} from "../dto/UpdateDto";
import {LoginDto} from "../dto/LoginDto";

export default class UserServiceImpl implements UserService{

    async register(newUserDto: NewUserDto): Promise<UserDto> {
        const find = await User.findOne({login: newUserDto.login})
        if(find) throw new HttpError(404, `User with login = ${newUserDto.login} is already exist`)
        const newUser =  await new User({...newUserDto}).save()
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

    async login(loginData: LoginDto): Promise<UserDto> {
        const res = await User.findOne(loginData)
        if(!res) throw new HttpError(404, `User with login = ${loginData.login} not found of the password is incorrect`)
        return new UserDto(res.login, res.roles, res.firstName, res.lastName)
    }

    async updateUser(login: string, updateData: UpdateDto): Promise<UserDto> {
        const res = await User.findOneAndUpdate({login}, updateData, {new: true})
        if(!res) throw new HttpError(404, `User with login = ${login} not found`)
        return new UserDto(res.login, res.roles, res.firstName, res.lastName)
    }

}