import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User){}


  async register(createUserDto: CreateUserDto):Promise<{message: string, data:Partial<User>}> {
try {
  const {username, email, password, role} = createUserDto
  const checkUser = await this.userModel.findOne({where: {username}})

  if(checkUser){
    throw new BadRequestException('Username already exists')
  }
  const salt = await bcrypt.genSaltSync(10)
  const hash = await bcrypt.hashSync(password, salt)

  const newUser = await this.userModel.create({username, email, password:hash, role})
 return {message: 'User registered successfully', data: newUser}
} catch (error) {
  if(error instanceof HttpException){
    throw error;
  }
  console.error(error)
  throw new InternalServerErrorException('Something went wrong')
  }
  }

 async findAll():Promise<User[]> {
    const users = await this.userModel.findAll()
    return users
  }

 async findOne(id: string):Promise<{message:string, data: User}> {

  const user = await this.userModel.findOne({where: {id}})

  if(!user) throw new NotFoundException('User not found')

    return {message: 'User found', data: user}
  }

 async update(id: string, updateUserDto: UpdateUserDto):Promise<{message:string, data:User}> {
    const user = await this.userModel.findOne({where: {id}})
    if(!user) throw new NotFoundException('User not found')

     await user.update({...updateUserDto})
     await user.reload();

    return {message: 'User updated successfully', data: user}
  }

 async remove(id: string):Promise<string> {
  const user = await this.userModel.findOne({where: {id}})
  if(!user) throw new NotFoundException('User not found')

   await this.userModel.destroy({where: {id}})
  return 'User deleted successfully'
  }
}
