import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: User;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<{
        message: string;
        data: User;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: User;
    }>;
    remove(id: number): Promise<string>;
}
