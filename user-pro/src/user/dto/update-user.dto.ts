import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

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
      role:string
}
