import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/loginDto';
import { JwtGuard } from 'src/Guards/jwtAuth.guard';
import { AdminGuard } from 'src/Guards/admin.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto){
    return this.userService.login(loginDto)
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
 
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
