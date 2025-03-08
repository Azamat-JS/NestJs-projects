import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("./user.model").User;
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
