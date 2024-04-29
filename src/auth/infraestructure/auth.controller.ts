import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthServiceInterface } from '../domain/in_auth_interface';
import { dataUserDto } from './dtos/data_user';
import { LoginDto } from './dtos/login-dto';
import { JwtAuthGuard } from './adapters/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceInterface)
    private readonly authService: AuthServiceInterface,
    ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const {email, password} = loginDto
    return this.authService.login(email, password)
  }

  @Post('register')
  register(@Body() registerDto: dataUserDto) {
    const { email, username, password, photourl } = registerDto
    return this.authService.register(username, email, password, photourl)
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)  
  getUsers() {
    return this.authService.getUsers()
  }


}
