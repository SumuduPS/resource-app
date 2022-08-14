enum RESOURCE_TYPE {
    PUBLIC='public',
    PRIVATE='private',
    ADMIN='admin'
}

export class ResourceDto {
    id: string;
    type: RESOURCE_TYPE
}