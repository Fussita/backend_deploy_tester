import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AuthServiceInterface } from '../domain/in_auth_interface';
import { DbManagerInterface } from '../domain/out_dbmanager_interfaces';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginResponse } from '../infraestructure/dtos/response';
import { dataUserDto } from '../infraestructure/dtos/data_user';

@Injectable()
export class AuthService implements AuthServiceInterface {
  
  constructor(
    @Inject(DbManagerInterface)
    private readonly dbManager: DbManagerInterface,
    /// To Resolve
    private jwtAuthService: JwtService,
  ) {}
  
  getUsers(): Promise<dataUserDto[]> {
    return this.dbManager.getUsers()
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const findUser = await this.dbManager.findUserByEmail(email)
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)  
 
    const checkPassword = await bcrypt.compare(password, findUser.password)
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403)      

    const token = this.jwtAuthService.sign( { username: findUser.username, email: findUser.email } )
    const data = { 
      username: findUser.username, 
      email: findUser.email, 
      password: password,
      token: token 
    }   
    return data
  }
  
  async register(username: string, email: string, password: string, photourl: string): Promise<boolean> {
    const findUser = await this.dbManager.findUserByEmail(email)
    if (findUser) throw new HttpException('USER_EXIST', 403) 

    const findUserName = await this.dbManager.findUserByUsername(username)
    if (findUserName) throw new HttpException('USERNAME_EXIST', 403)

    const plainToHash = await bcrypt.hash(password, 10)
    this.dbManager.registerUser(username, email, plainToHash, photourl)
    return true
  }

}
