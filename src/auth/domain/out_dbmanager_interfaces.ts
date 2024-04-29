import { dataUserDto } from "../infraestructure/dtos/data_user";

export interface DbManagerInterface {
    findUserByEmail(email: string): Promise<dataUserDto>
    findUserByUsername(username: string): Promise<dataUserDto>
    registerUser(username: string, email: string, password: string, photourl: string): void
    getUsers(): Promise<dataUserDto[]>
}

export const DbManagerInterface = Symbol('DbManagerInterface')
