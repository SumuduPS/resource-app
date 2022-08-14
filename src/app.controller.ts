import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('user/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
