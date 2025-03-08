import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
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
