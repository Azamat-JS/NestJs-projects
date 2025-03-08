import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: Partial<User>;
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
