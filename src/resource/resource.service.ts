import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionResponse } from './dto/execution-response.dto';
import { ResourceDto } from './dto/resource.dto';
import { StatusMessage } from './enum/status-message.enum';
import { Resource, RESOURCE_TYPE } from './resource.entity';

@Injectable()
export class ResourceService {

    constructor(
        @InjectRepository(Resource)
        private readonly _resourceRepository: Repository<Resource>,
        private readonly logger: Logger,
      ) {}

    async getAllPublicResources(){
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try {
            this.logger.debug(`Started executing getAllPublicResources`)
            data=await this._resourceRepository.find({where:{
                type:RESOURCE_TYPE.PUBLIC
            }});
        } catch (error) {
            this.logger.error(`Error in executing getAllPublicResources`,error)
            errorMessage=error.message;
            status=StatusMessage.FAILED;
        }
        
        if(status===StatusMessage.SUCCESS){
            response.status=status;
            response.data=data;
        }else if(status===StatusMessage.FAILED){
            response.status=status;
            response.message=errorMessage;
        }

        this.logger.debug(`Finished executing getAllPublicResources`)
        return response;
    }

    async getAllPrivateResources(){
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try{
            this.logger.debug(`Started executing getAllPrivateResources`)

            data=await this._resourceRepository.find({where:{
                type:RESOURCE_TYPE.PRIVATE
            }});
        }catch(error){
            this.logger.error(`Error in executing getAllPrivateResources`,error)
            errorMessage=error.message;
            status=StatusMessage.FAILED;
        }
        

        if(status===StatusMessage.SUCCESS){
            response.status=status;
            response.data=data;
        }else if(status===StatusMessage.FAILED){
            response.status=status;
            response.message=errorMessage;
        }
        this.logger.debug(`Finished executing getAllPrivateResources`)
        return response;
    }

    async getAllAdminResources()
    {
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try {
            this.logger.debug(`Started executing getAllAdminResources`)
            data= await this._resourceRepository.find(
                {
                    where:
                    [
                        {type:RESOURCE_TYPE.ADMIN},
                        {type:RESOURCE_TYPE.PRIVATE},
                    ]
                });
        } catch (error) {
            this.logger.error(`Error in executing getAllAdminResources`,error)

            errorMessage=error.message;
            status=StatusMessage.FAILED;
        }
        
            if(status===StatusMessage.SUCCESS){
                response.status=status;
                response.data=data;
            }else if(status===StatusMessage.FAILED){
                response.status=status;
                response.message=errorMessage;
            }

        this.logger.debug(`Finished executing getAllAdminResources`)

            return response;
    }

    async addResourcesById(resourceId: string,resource: ResourceDto):Promise<ExecutionResponse>{
        let status=StatusMessage.SUCCESS;
        let errorMessage='';
        let response=new ExecutionResponse();

        this.logger.debug(`Started executing addResourcesById`)

        resource.id=resourceId;

        await this._resourceRepository.insert(resource).catch((error)=>{
            errorMessage=error.driverError?.detail?error.driverError?.detail:error.message;
            status=StatusMessage.FAILED;
        });

        if(status===StatusMessage.SUCCESS){
            response.status=status;
            response.resourceId=resourceId;
        }else if(status===StatusMessage.FAILED){
            this.logger.error(`Failed executing addResourcesById`)
            response.status=status;
            response.message=errorMessage;
            response.resourceId=resourceId;
        }

        this.logger.debug(`Finished executing addResourcesById`)

        return response;
    }

    async getPrivateResourceById(resourceId: string):Promise<ExecutionResponse>{
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try {
            this.logger.debug(`Started executing getPrivateResourceById`)
            data=await this._resourceRepository.find({where:{
                id:resourceId
            }});
        } catch (error) {
            errorMessage=error.message;
            status=StatusMessage.FAILED;
        }
       
         if(status===StatusMessage.SUCCESS){
                response.status=status;
                response.data=data;
            }else if(status===StatusMessage.FAILED){
                response.status=status;
                response.message=errorMessage;
            }

            this.logger.debug(`Finished executing getPrivateResourceById`)

            return response;
    }

    async updateResourceById(resourceId: string,resource: ResourceDto):Promise<ExecutionResponse>{
        let status=StatusMessage.SUCCESS;
        let errorMessage='';
        let response=new ExecutionResponse();
        this.logger.debug(`Started executing updateResourceById`)

        const updateResult=await this._resourceRepository.update({id:resourceId},resource).then(response=>response.affected).catch((error)=>{
                errorMessage=error.driverError?.detail?error.driverError?.detail:error.message;
                status=StatusMessage.FAILED;
            });

             if(status===StatusMessage.SUCCESS){
                if(updateResult && updateResult>0){
                    response.status=status;
                    response.resourceId=resourceId;
                }else{
                    response.status=StatusMessage.FAILED;
                    response.resourceId=resourceId;
                    response.message=`No record found for resource Id ${resourceId}`
                }
        }else if(status===StatusMessage.FAILED){
            response.status=status;
            response.message=errorMessage;
            response.resourceId=resourceId;
        }

        this.logger.debug(`Finished executing updateResourceById`)
        return response;
    }

    async removeResourceById(resourceId: string) {
        let status=StatusMessage.SUCCESS;
        let errorMessage='';
        let response=new ExecutionResponse();
        this.logger.debug(`Started executing removeResourceById`)

        const deleteResult=await this._resourceRepository.delete(resourceId).then(response=>response.affected).catch((error)=>{
            errorMessage=error.driverError?.detail?error.driverError?.detail:error.message;
            status=StatusMessage.FAILED;
        });

        if(status===StatusMessage.SUCCESS){
            if(deleteResult && deleteResult>0){
                response.status=status;
                response.resourceId=resourceId;
            }else{
                response.status=StatusMessage.FAILED;
                response.resourceId=resourceId;
                response.message=`No record found for resource Id ${resourceId}`
            }
    }else if(status===StatusMessage.FAILED){
        response.status=status;
        response.message=errorMessage;
        response.resourceId=resourceId;
    }
    
    this.logger.debug(`Finished executing removeResourceById`)
    return response;
    }
}
