import { Injectable ,Request} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && await bcrypt.compare(pass, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: UserDto,res:any) {
        const payload = { username: user.username, sub: user.id ,role:user.role};

        const access_token= this.jwtService.sign(payload);
        res.cookie('jwt', access_token, {httpOnly: true});

        return {
            message: 'success'
        };
      }

      async logout(res:any) {
        try {
          res.clearCookie('jwt');
        } catch (error) {
          throw new Error('invalid credentials');
        }
        
        return {
          message:"success"
        }
      }     
}
