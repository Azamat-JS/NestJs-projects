import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.model";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/loginDto";
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: Partial<User>;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<{
        message: string;
        data: User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: User;
    }>;
    remove(id: string): Promise<string>;
}
