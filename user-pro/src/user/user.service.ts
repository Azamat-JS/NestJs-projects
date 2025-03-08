import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/loginDto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  // Register
  async register(
    createUserDto: CreateUserDto
  ): Promise<{ message: string; data: Partial<User> }> {
    try {
      const { username, email, password, role } = createUserDto;
      const checkUser = await this.userModel.findOne({ where: { username } });

      if (checkUser) {
        throw new BadRequestException("Username already exists");
      }
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);

      const newUser = await this.userModel.create({
        username,
        email,
        password: hash,
        role,
      });
      return { message: "User registered successfully", data: newUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  // Login

  async login(loginDto: LoginDto): Promise<{ message: string; token: string }> {
    try {
      const { email, password } = loginDto;

      const checkEmail = await this.userModel.findOne({ where: { email } });
      if (!checkEmail) {
        throw new UnauthorizedException("Unauthorized Error, please sign up");
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        checkEmail.dataValues.password
      );
      if (!isPasswordMatch) {
        throw new BadRequestException("Invalid credentials");
      }

      const payload = {
        id: checkEmail.dataValues.id,
        email: checkEmail.dataValues.email,
        role: checkEmail.dataValues.role,
      };
      const accessToken = await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET,
        expiresIn: '1d'
      });

      return { message: "Login successful", token: accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  // Get All Users
  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  //Get one user
  async findOne(id: string): Promise<{ message: string; data: User }> {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) throw new NotFoundException("User not found");

    return { message: "User found", data: user };
  }

  // UPdate user
  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<{ message: string; data: User }> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    await user.update({ ...updateUserDto });
    await user.reload();

    return { message: "User updated successfully", data: user };
  }

  // Delete User
  async remove(id: string): Promise<string> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    await this.userModel.destroy({ where: { id } });
    return "User deleted successfully";
  }
}
