import { Controller, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('user')
export class UsersController {
 
}
