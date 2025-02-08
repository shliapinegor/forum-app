export default class UserDto{
    private _login: string;
    private _roles: string[];
    private _firstName: string;
    private _lastName: string


    constructor(login: string, roles: string[], firstName: string, lastName: string) {
        this._login = login;
        this._roles = roles;
        this._firstName = firstName;
        this._lastName = lastName;
    }


    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get roles(): string[] {
        return this._roles;
    }

    set roles(value: string[]) {
        this._roles = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }
}