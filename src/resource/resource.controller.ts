import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {

    constructor(private _resourceService:ResourceService){}

    @Get('/public/all')
    async getAllPublicResources(){
        return await this._resourceService.getAllPublicResources();
    }

    @Get('/private/all')
    async getAllPrivateResources(){
        return await this._resourceService.getAllPrivateResources();
    }

    @Get('/admin/all')
    async getAllAdminResources(){
        return await this._resourceService.getAllAdminResources();
    }

    @Get('/private/:resourceId')
    async getPrivateResourceById(@Param() params){
        return await this._resourceService.getPrivateResourceById(params.resourceId);
    }

    @Post('/private/:resourceId')
    async addResourcesById(@Param('resourceId') resourceId,@Body() resource: ResourceDto){
        return await this._resourceService.addResourcesById(resourceId,resource);
    }

    @Put('/private/:resourceId')
    async updateResourceById(@Param('resourceId') resourceId: string, @Body() resource: ResourceDto) {
        return await this._resourceService.updateResourceById(resourceId,resource);
    }

    @Delete('/private/:resourceId')
    async removeResourceById(@Param('resourceId') resourceId: string) {
        return await this._resourceService.removeResourceById(resourceId);

    }
}
