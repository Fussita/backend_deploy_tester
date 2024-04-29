import { dataUserDto } from "../infraestructure/dtos/data_user";
import { LoginResponse } from "../infraestructure/dtos/response";

export interface AuthServiceInterface {
    login(email: string, password: string): Promise<LoginResponse>;
    register(username: string, email: string, password: string, photourl: string): Promise<boolean>;
    getUsers(): Promise<dataUserDto[]>
}

export const AuthServiceInterface = Symbol('AuthServiceInterface');
