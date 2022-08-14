import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

 constructor(
  @InjectRepository(User)
  private readonly _userRepository: Repository<User>,
 ){}
  async findOne(username: string): Promise<UserDto | undefined> {
    return await this._userRepository.findOne({where:{
      username:username
    }});
  }
}