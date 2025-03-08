import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({message: 'Password field must not be empty'})
  @IsString()
  password: string;

}
