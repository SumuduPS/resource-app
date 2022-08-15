import { Controller, Request, Post, UseGuards,Req,Next, Res, Delete, Options} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('user/login')
    async login(@Request() req, @Res({passthrough:true}) res) {
      return this.authService.login(req.user,res);
    }


    @Post('user/logout')
    async logout(@Res({passthrough:true}) res) {
      return this.authService.logout(res);
    }
}
