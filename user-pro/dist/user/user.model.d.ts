import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}
