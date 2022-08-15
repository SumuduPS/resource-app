import { Injectable ,Logger,Request} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly logger: Logger,
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

        try {
          this.logger.debug(`Started login`)
          const payload = { username: user.username, sub: user.id ,role:user.role};

        const access_token= this.jwtService.sign(payload);
        res.cookie('jwt', access_token, {httpOnly: true});
        this.logger.debug(`Login Success`)
        return {
            message: 'success'
        };
        } catch (error) {
          this.logger.debug(`Login Error`,error.message)
          throw new Error(error.message)
        }
      }

      async logout(res:any) {
        try {
          this.logger.debug(`Started logout`)
          res.clearCookie('jwt');
          this.logger.debug(`Logout Success`)
          return {
            message:"success"
          }
        } catch (error) {
          this.logger.error(`Logout Error`)
          throw new Error(error.message);
        } 
      }     
}
