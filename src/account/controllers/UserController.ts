import {Body, Controller, Delete, Get, HeaderParam, Param, Post, Put, Res, UseBefore} from "routing-controllers";
import NewUserDto from "../dto/NewUserDto";
import UserService from "../services/UserService";
import UserServiceImpl from "../services/UserServiceImpl";
import {UpdateDto} from "../dto/UpdateDto";
import {Response} from "express";
import {AuthMiddleware} from "../middleware/AuthMiddleware";
import {CheckUserPermission} from "../middleware/CheckUserPermission";
import {CheckAdmin} from "../middleware/CheckAdmin";


@Controller('/account')
export default class UserController {
    userService:UserService = new UserServiceImpl();

    @Post('/register')
    async register(@Body({validate: true, required: true}) newUserDto: NewUserDto) {
        return this.userService.register(newUserDto);
    }
    @UseBefore(AuthMiddleware)
    @Post('/login')
    async login(@HeaderParam('Authorization') token: string, @Res() res: Response) {
        return this.userService.login(token)
    }
    @UseBefore(AuthMiddleware)
    @UseBefore(CheckAdmin)
    @UseBefore(CheckUserPermission)
    @Delete('/user/:login')
    async deleteUser(@Param('login') login : string){
        return this.userService.deleteUser(login)
    }
    @UseBefore(AuthMiddleware)
    @Get('/user/:login')
    async getUserByLogin(@Param('login') login : string){
        return this.userService.getUserByLogin(login)
    }
    @UseBefore(AuthMiddleware)
    @UseBefore(CheckUserPermission)
    @Put('/user/:login')
    async updateUser(@Param('login') login : string, @Body() updateData: UpdateDto){
        return this.userService.updateUser(login, updateData)
    }

    @UseBefore(AuthMiddleware)
    @UseBefore(CheckAdmin)
    @Put('/user/:login/role/:role')
    async addRole(@Param('login') login : string, @Param('role') role : string){
        return this.userService.addRole(login, role)
    }
    @UseBefore(AuthMiddleware)
    @UseBefore(CheckAdmin)
    @Delete('/user/:login/role/:role')
    async deleteRole(@Param('login') login : string, @Param('role') role : string){
        return this.userService.deleteRole(login, role)
    }

}