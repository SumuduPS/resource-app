import { ResourceDto } from "./resource.dto";

export class ExecutionResponse{
    status?:string;
    message?:string;
    resourceId?:string;
    data?:ResourceDto[];
}