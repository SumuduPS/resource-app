import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { USER_ROLE } from "../auth/enum/user-role.enum";

@Entity('user')
export class User {  
    @PrimaryColumn() id: string;  
    
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    username: string;

    @Column() 
    password: string;  
    
    
    @Column() 
    email: string;

    @Column() 
    role: USER_ROLE;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}