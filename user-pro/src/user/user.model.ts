import {AllowNull, Column, DataType, Model, Table} from 'sequelize-typescript'

@Table({tableName: "users"})
export class User extends Model {
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true})
    declare id: string;

    @AllowNull(false)
    @Column
    username:string;

    @AllowNull(false)
    @Column
    email:string;

    @AllowNull(false)
    @Column
    password:string;
    
    @AllowNull(false)
    @Column
    role:string;
}