import {Body, Controller, Delete, Get, Param, Post, Put} from "routing-controllers";
import NewUserDto from "../dto/NewUserDto";
import UserService from "../services/UserService";
import UserServiceImpl from "../services/UserServiceImpl";
import {UpdateDto} from "../dto/UpdateDto";
import {LoginDto} from "../dto/LoginDto";


@Controller('/account')
export default class UserController {
    userService:UserService = new UserServiceImpl();

    @Post('/register')
    async register(@Body({validate: true, required: true}) newUserDto: NewUserDto) {
        return this.userService.register(newUserDto);
    }

    @Delete('/user/:login')
    async deleteUser(@Param('login') login : string){
        return this.userService.deleteUser(login)
    }

    @Get('/user/:login')
    async getUserByLogin(@Param('login') login : string){
        return this.userService.getUserByLogin(login)
    }
    @Put('/user/:login')
    async updateUser(@Param('login') login : string, @Body() updateData: UpdateDto){
        return this.userService.updateUser(login, updateData)
    }

    @Put('/user/:login/role/:role')
    async addRole(@Param('login') login : string, @Param('role') role : string){
        return this.userService.addRole(login, role)
    }

    @Delete('/user/:login/role/:role')
    async deleteRole(@Param('login') login : string, @Param('role') role : string){
        return this.userService.deleteRole(login, role)
    }

    @Post('/login')
    async login(@Body({validate: true, required: true}) loginData: LoginDto){
        return this.userService.login(loginData)
    }
}