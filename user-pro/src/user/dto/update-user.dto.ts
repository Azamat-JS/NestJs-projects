import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";

enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
      @IsString()
      username: string;
    
      @IsNotEmpty({ message: 'Email cannot be empty' })
      @IsEmail()
      email: string;
    
      @IsNotEmpty({message: 'Password field must not be empty'})
      @IsString()
      password: string;
    
      @IsString()
      @IsEnum(UserRole, {message: 'Role must be either admin or user'})
      role:string
}
