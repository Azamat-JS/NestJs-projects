import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/loginDto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: Partial<import("./user.model").User>;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<import("./user.model").User[]>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./user.model").User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: import("./user.model").User;
    }>;
    remove(id: string): Promise<string>;
}
