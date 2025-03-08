"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(createUserDto) {
        try {
            const { username, email, password, role } = createUserDto;
            const checkUser = await this.userModel.findOne({ where: { username } });
            if (checkUser) {
                throw new common_1.BadRequestException('Username already exists');
            }
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(password, salt);
            const newUser = await this.userModel.create({ username, email, password: hash, role });
            return { message: 'User registered successfully', data: newUser };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            console.error(error);
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async findAll() {
        const users = await this.userModel.findAll();
        return users;
    }
    async findOne(id) {
        const user = await this.userModel.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return { message: 'User found', data: user };
    }
    async update(id, updateUserDto) {
        const user = await this.userModel.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await user.update({ ...updateUserDto });
        await user.reload();
        return { message: 'User updated successfully', data: user };
    }
    async remove(id) {
        const user = await this.userModel.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.userModel.destroy({ where: { id } });
        return 'User deleted successfully';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map