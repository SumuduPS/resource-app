import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { USER_ROLE } from '../auth/enum/user-role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
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
    @UseGuards(JwtAuthGuard)
    async getAllPrivateResources(){
        return await this._resourceService.getAllPrivateResources();
    }
  
    @Get('/admin/all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(USER_ROLE.ADMIN)
    async getAllAdminResources(){
        return await this._resourceService.getAllAdminResources();
    }

    @Get('/private/:resourceId')
    @UseGuards(JwtAuthGuard)
    async getPrivateResourceById(@Param() params){
        return await this._resourceService.getPrivateResourceById(params.resourceId);
    }

    @Post('/private/:resourceId')
    @UseGuards(JwtAuthGuard)
    async addResourcesById(@Param('resourceId') resourceId,@Body() resource: ResourceDto){
        return await this._resourceService.addResourcesById(resourceId,resource);
    }

    @Put('/private/:resourceId')
    @UseGuards(JwtAuthGuard)
    async updateResourceById(@Param('resourceId') resourceId: string, @Body() resource: ResourceDto) {
        return await this._resourceService.updateResourceById(resourceId,resource);
    }

    @Delete('/private/:resourceId')
    @UseGuards(JwtAuthGuard)
    async removeResourceById(@Param('resourceId') resourceId: string) {
        return await this._resourceService.removeResourceById(resourceId);
    }
}
