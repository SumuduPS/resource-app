import { USER_ROLE } from "src/auth/enum/user-role.enum";

export class UserDto{
    id:string;
    password:string;
    username:string;
    role:USER_ROLE;
    email:string;
}