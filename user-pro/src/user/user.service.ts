import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User){}


  async register(createUserDto: CreateUserDto):Promise<{message: string, data:User}> {
    const {username, email, password, role} = createUserDto
    const checkUser = await this.userModel.findOne({where: {username}})

    if(checkUser){
      throw new BadRequestException('Username already exists')
    }
    const newUser = await this.userModel.create({username, email, password, role})
   return {message: 'User registered successfully', data: newUser}
  }

 async findAll():Promise<User[]> {
    const users = await this.userModel.findAll()
    return users
  }

 async findOne(id: number):Promise<{message:string, data: User}> {

  const user = await this.userModel.findByPk(id)

  if(!user) throw new NotFoundException('User not found')

    return {message: 'User found', data: user}
  }

 async update(id: number, updateUserDto: UpdateUserDto):Promise<{message:string, data:User}> {
    const user = await this.userModel.findByPk(id)
    if(!user) throw new NotFoundException('User not found')

     await user.update({...updateUserDto})
     await user.reload();

    return {message: 'User updated successfully', data: user}
  }

 async remove(id: number):Promise<string> {
  const user = await this.userModel.findByPk(id)
  if(!user) throw new NotFoundException('User not found')

    this.userModel.destroy({where: {id}})
  return 'User deleted successfully'
  }
}
