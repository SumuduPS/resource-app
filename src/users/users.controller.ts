import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private _userService:UsersService){}
      
    @Post('/createUser')
    async createUser(@Body() users: UserDto[]){
        return await this._userService.addUser(users);
    }
}
