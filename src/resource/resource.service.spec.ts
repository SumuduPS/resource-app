import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import {getRepositoryToken} from '@nestjs/typeorm'
import { Resource } from './resource.entity';
import { Repository } from 'typeorm';
import { ResourceDto } from './dto/resource.dto';
import { Logger } from '@nestjs/common';

describe('ResourceService', () => {
  let service: ResourceService;
  let resourceRepository: Repository<Resource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceService,
      {
        provide: getRepositoryToken(Resource),
        useValue:{
          find: jest.fn(),
          insert: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        }
      },
      {
        provide: Logger,
        useFactory:()=>{
          const logger: Logger= new Logger();
          return logger;
        }
      }
      ],
    }).compile();

    service = module.get<ResourceService>(ResourceService);
    resourceRepository=module.get<Repository<Resource>>(getRepositoryToken(Resource));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getAllPublicResources',async  () => {

    const result:any={};
    jest.spyOn(resourceRepository,'find').mockImplementation(async ()=>result);
    expect(await service.getAllPublicResources()).toEqual({"data": {}, "status": "SUCCESS"});
  });

  it('should call getAllPrivateResources',async  () => {

    const result:any={};
    jest.spyOn(resourceRepository,'find').mockImplementation(async ()=>result);
    expect(await service.getAllPrivateResources()).toEqual({"data": {}, "status": "SUCCESS"});
  });

  it('should call getAllAdminResources',async  () => {

    const result:any={};
    jest.spyOn(resourceRepository,'find').mockImplementation(async ()=>result);
    expect(await service.getAllAdminResources()).toEqual({"data": {}, "status": "SUCCESS"});
  });

  it('should call getPrivateResourceById',async  () => {

    const result:any={};
    const id: string='1';
    jest.spyOn(resourceRepository,'find').mockImplementation(async ()=>result);
    expect(await service.getPrivateResourceById(id)).toEqual({"data": {}, "status": "SUCCESS"});
  });

  it('should call removeResourceById',async  () => {

    const result:any={};
    const id: string='10';
    jest.spyOn(resourceRepository,'delete').mockImplementation(async ()=>result);
    expect(await service.removeResourceById(id)).toEqual({"message": "No record found for resource Id 10","resourceId": "10","status": "FAILED"});
  });

  it('should call updateResourceById',async  () => {

    const result:any={};
    const id: string='10';
    const resource=new ResourceDto();
    jest.spyOn(resourceRepository,'update').mockImplementation(async ()=>result);
    expect(await service.updateResourceById(id,resource)).toEqual({"message": "No record found for resource Id 10","resourceId": "10","status": "FAILED"});
  });

  it('should call addResourcesById',async  () => {

    const result:any={};
    const id: string='100';
    const resource=new ResourceDto();
    jest.spyOn(resourceRepository,'insert').mockImplementation(async ()=>result);
    expect(await service.addResourcesById(id,resource)).toEqual({"resourceId": "100","status": "SUCCESS"});
  });

  it('should call updateResourceById',async  () => {

    const result:any={};
    const id: string='10';
    const resource=new ResourceDto();

    jest.spyOn(resourceRepository,'update').mockImplementation(async ()=>result);
    expect(await service.updateResourceById(id,resource)).toEqual({"message": "No record found for resource Id 10","resourceId": "10","status": "FAILED"});
  });
});
