import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionResponse } from 'src/resource/dto/execution-response.dto';
import { StatusMessage } from 'src/resource/enum/status-message.enum';
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

  async addUser(users: UserDto[]):Promise<ExecutionResponse>{
    let status=StatusMessage.SUCCESS;
    let errorMessage='';
    let response=new ExecutionResponse();

    const userData= this._userRepository.create(users)
    
    await this._userRepository.save(userData).catch((error)=>{
        errorMessage=error.driverError?.detail?error.driverError?.detail:error.message;
        status=StatusMessage.FAILED;
    });

    if(status===StatusMessage.SUCCESS){
        response.status=status;
    }else if(status===StatusMessage.FAILED){
        response.status=status;
        response.message=errorMessage;
    }
    return response;
}
}