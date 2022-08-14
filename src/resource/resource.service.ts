import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ExecutionResponse } from './dto/execution-response.dto';
import { ResourceDto } from './dto/resource.dto';
import { StatusMessage } from './enum/status-message.enum';
import { Resource, RESOURCE_TYPE } from './resource.entity';

@Injectable()
export class ResourceService {

    constructor(
        @InjectRepository(Resource)
        private readonly _resourceRepository: Repository<Resource>,
      ) {}

    async getAllPublicResources(){
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try {
            data=await this._resourceRepository.find({where:{
                type:RESOURCE_TYPE.PUBLIC
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

        return response;
    }

    async getAllPrivateResources(){
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try{
            data=await this._resourceRepository.find({where:{
                type:RESOURCE_TYPE.PRIVATE
            }});
        }catch(error){
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
        return response;
    }

    async getAllAdminResources()
    {
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try {
            data= await this._resourceRepository.find(
                {
                    where:
                    [
                        {type:RESOURCE_TYPE.ADMIN},
                        {type:RESOURCE_TYPE.PRIVATE},
                    ]
                });
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

            return response;
    }

    async addResourcesById(resourceId: string,resource: ResourceDto):Promise<ExecutionResponse>{
        let status=StatusMessage.SUCCESS;
        let errorMessage='';
        let response=new ExecutionResponse();

        resource.id=resourceId;

        await this._resourceRepository.insert(resource).catch((error)=>{
            errorMessage=error.driverError?.detail?error.driverError?.detail:error.message;
            status=StatusMessage.FAILED;
        });

        if(status===StatusMessage.SUCCESS){
            response.status=status;
            response.resourceId=resourceId;
        }else if(status===StatusMessage.FAILED){
            response.status=status;
            response.message=errorMessage;
            response.resourceId=resourceId;
        }
        return response;
    }

    async getPrivateResourceById(resourceId: string):Promise<ExecutionResponse>{
        let status=StatusMessage.SUCCESS;
        let data:ResourceDto[]=[];
        let errorMessage='';
        let response=new ExecutionResponse();

        try {
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

            return response;
    }

    async updateResourceById(resourceId: string,resource: ResourceDto):Promise<ExecutionResponse>{
        let status=StatusMessage.SUCCESS;
        let errorMessage='';
        let response=new ExecutionResponse();

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
        return response;
    }

    async removeResourceById(resourceId: string) {
        let status=StatusMessage.SUCCESS;
        let errorMessage='';
        let response=new ExecutionResponse();

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
    
    return response;
    }
}
