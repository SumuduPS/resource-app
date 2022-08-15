import { Column, Entity, PrimaryColumn } from "typeorm"

export enum RESOURCE_TYPE {
    PUBLIC='public',
    PRIVATE='private',
    ADMIN='admin'
  }

@Entity()
export class Resource {
  @PrimaryColumn()
  id: string

  @Column({type:'enum', enum:RESOURCE_TYPE})
  type:RESOURCE_TYPE
}