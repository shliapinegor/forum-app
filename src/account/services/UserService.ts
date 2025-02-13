import NewUserDto from "../dto/NewUserDto";
import UserDto from "../dto/UserDto";
import {UpdateDto} from "../dto/UpdateDto";

export default interface UserService{

    register(newUserDto: NewUserDto): Promise<UserDto>;

    deleteUser(login: string): Promise<UserDto>;

    getUserByLogin(login: string): Promise<UserDto>;

    updateUser(login: string, updateData: UpdateDto):Promise<UserDto>;

    addRole(login: string, role: string): Promise<UserDto>;

    deleteRole(login: string, role: string): Promise<UserDto>;

    login(token: string) : Promise<UserDto>;
}